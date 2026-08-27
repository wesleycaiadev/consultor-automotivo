import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AdminAuthService,
  type AdminVehicleImage,
  type AdminVehicleListItem,
  type VehicleQuickUpdate,
} from '../../core/auth/admin-auth.service';

type QuickStatus = VehicleQuickUpdate['status'];
interface QuickVehicleDraft {
  mileage: number;
  price: number | null;
  status: QuickStatus;
  featured: boolean;
}

@Component({
  selector: 'app-admin-vehicle-list-page',
  imports: [CurrencyPipe, DecimalPipe, FormsModule, RouterLink],
  templateUrl: './admin-vehicle-list-page.component.html',
  styleUrl: './admin-vehicle-list-page.component.scss',
})
export class AdminVehicleListPageComponent implements OnInit {
  readonly auth = inject(AdminAuthService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly vehicles = signal<readonly AdminVehicleListItem[]>([]);
  readonly editingVehicle = signal<AdminVehicleListItem | null>(null);
  readonly images = signal<readonly AdminVehicleImage[]>([]);
  readonly selectedCoverId = signal<string | null>(null);
  readonly loadingImages = signal(false);
  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);

  quickDraft: QuickVehicleDraft = {
    mileage: 0,
    price: null,
    status: 'draft',
    featured: false,
  };

  async ngOnInit(): Promise<void> {
    try {
      this.vehicles.set(await this.auth.listVehicles());
    } catch {
      this.error.set('Não foi possível carregar os veículos. Atualize a página e tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }

  async openQuickEdit(vehicle: AdminVehicleListItem): Promise<void> {
    this.editingVehicle.set(vehicle);
    this.quickDraft = {
      mileage: vehicle.mileage,
      price: vehicle.price,
      status: vehicle.status,
      featured: vehicle.featured,
    };
    this.images.set([]);
    this.selectedCoverId.set(null);
    this.saveError.set(null);
    this.loadingImages.set(true);
    try {
      const images = await this.auth.listVehicleImages(vehicle.id);
      this.images.set(images);
      this.selectedCoverId.set(images.find((image) => image.isCover)?.id ?? null);
    } catch {
      this.saveError.set(
        'As fotos não puderam ser carregadas agora. Os demais dados continuam editáveis.',
      );
    } finally {
      this.loadingImages.set(false);
    }
  }

  closeQuickEdit(): void {
    this.editingVehicle.set(null);
    this.images.set([]);
    this.selectedCoverId.set(null);
    this.saveError.set(null);
  }

  setStatus(status: QuickStatus): void {
    this.quickDraft.status = status;
    if (status !== 'published') this.quickDraft.featured = false;
  }

  selectCover(imageId: string): void {
    this.selectedCoverId.set(imageId);
  }

  async saveQuickEdit(): Promise<void> {
    const vehicle = this.editingVehicle();
    if (!vehicle) return;
    if (!Number.isFinite(Number(this.quickDraft.mileage)) || Number(this.quickDraft.mileage) < 0) {
      this.saveError.set('Informe uma quilometragem válida para salvar.');
      return;
    }
    if (this.quickDraft.price !== null && Number(this.quickDraft.price) < 0) {
      this.saveError.set('O preço não pode ser negativo.');
      return;
    }

    this.saving.set(true);
    this.saveError.set(null);
    try {
      const update: VehicleQuickUpdate = {
        ...this.quickDraft,
        mileage: Number(this.quickDraft.mileage),
        price: this.quickDraft.price === null ? null : Number(this.quickDraft.price),
        featured: this.quickDraft.status === 'published' && this.quickDraft.featured,
      };
      const updated = await this.auth.updateVehicleQuick(vehicle.id, update);
      const initialCoverId = this.images().find((image) => image.isCover)?.id ?? null;
      const selectedCoverId = this.selectedCoverId();
      if (selectedCoverId && selectedCoverId !== initialCoverId) {
        await this.auth.setVehicleCover(vehicle.id, selectedCoverId);
      }
      this.vehicles.update((vehicles) =>
        vehicles.map((current) => (current.id === updated.id ? updated : current)),
      );
      this.closeQuickEdit();
    } catch (saveError) {
      console.error('Falha na edição rápida do veículo:', saveError);
      this.saveError.set('Não foi possível salvar a alteração. Revise os dados e tente novamente.');
    } finally {
      this.saving.set(false);
    }
  }

  statusLabel(status: QuickStatus): string {
    return { draft: 'Em preparação', published: 'No showroom', sold: 'Vendido' }[status];
  }
}

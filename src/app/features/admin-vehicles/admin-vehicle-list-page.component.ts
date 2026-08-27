import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
const acceptedMediaTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxMediaSize = 10 * 1024 * 1024;
const maxVehicleMedia = 15;

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
  readonly uploading = signal(false);
  readonly uploadProgress = signal(0);
  readonly uploadTotal = signal(0);
  readonly uploadPercent = computed(() =>
    this.uploadTotal() > 0 ? (this.uploadProgress() / this.uploadTotal()) * 100 : 0,
  );
  readonly mediaError = signal<string | null>(null);
  readonly movingImageId = signal<string | null>(null);

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
    this.mediaError.set(null);
    this.uploading.set(false);
    this.uploadProgress.set(0);
    this.uploadTotal.set(0);
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
    this.mediaError.set(null);
    this.uploading.set(false);
    this.uploadProgress.set(0);
    this.uploadTotal.set(0);
    this.movingImageId.set(null);
  }

  setStatus(status: QuickStatus): void {
    this.quickDraft.status = status;
    if (status !== 'published') this.quickDraft.featured = false;
  }

  selectCover(imageId: string): void {
    this.selectedCoverId.set(imageId);
  }

  selectMedia(event: Event): void {
    const input = event.target as HTMLInputElement;
    void this.uploadMedia(input.files ? Array.from(input.files) : []);
    input.value = '';
  }

  dropMedia(event: DragEvent): void {
    event.preventDefault();
    void this.uploadMedia(event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : []);
  }

  async uploadMedia(files: readonly File[]): Promise<void> {
    const vehicle = this.editingVehicle();
    if (!vehicle || !files.length) return;
    this.mediaError.set(null);
    const validFiles = files.filter(
      (file) => acceptedMediaTypes.has(file.type) && file.size <= maxMediaSize,
    );
    if (validFiles.length !== files.length) {
      this.mediaError.set('Algumas fotos foram ignoradas. Use JPEG, PNG ou WebP com até 10 MB.');
    }
    if (!validFiles.length) return;
    if (this.images().length + validFiles.length > maxVehicleMedia) {
      this.mediaError.set('O limite é de 15 fotos por veículo.');
      return;
    }

    this.uploading.set(true);
    this.uploadProgress.set(0);
    this.uploadTotal.set(validFiles.length);
    try {
      const images = await this.auth.uploadVehicleImages(
        vehicle.id,
        vehicle.brand,
        vehicle.model,
        validFiles,
        (completed, total) => {
          this.uploadProgress.set(completed);
          this.uploadTotal.set(total);
        },
      );
      this.images.set(images);
      this.selectedCoverId.set(images.find((image) => image.isCover)?.id ?? null);
    } catch (uploadError) {
      console.error('Falha no upload de imagens:', uploadError);
      this.mediaError.set('Não foi possível enviar as fotos. Nenhuma imagem parcial foi mantida.');
    } finally {
      this.uploading.set(false);
    }
  }

  async moveImage(imageId: string, direction: -1 | 1): Promise<void> {
    const vehicle = this.editingVehicle();
    const images = this.images();
    const index = images.findIndex((image) => image.id === imageId);
    const destination = index + direction;
    if (!vehicle || index < 0 || destination < 0 || destination >= images.length) return;

    this.movingImageId.set(imageId);
    this.mediaError.set(null);
    const reordered = [...images];
    [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
    try {
      await this.auth.reorderVehicleImages(
        vehicle.id,
        reordered.map((image) => image.id),
      );
      this.images.set(reordered.map((image, sortOrder) => ({ ...image, sortOrder })));
    } catch (moveError) {
      console.error('Falha ao reordenar imagens:', moveError);
      this.mediaError.set('Não foi possível alterar a ordem das fotos. Tente novamente.');
    } finally {
      this.movingImageId.set(null);
    }
  }

  async removeMedia(image: AdminVehicleImage): Promise<void> {
    const vehicle = this.editingVehicle();
    if (!vehicle) return;
    this.movingImageId.set(image.id);
    this.mediaError.set(null);
    try {
      await this.auth.removeVehicleImage(vehicle.id, image);
      const images = this.images().filter((current) => current.id !== image.id);
      const coverId = image.isCover
        ? (images[0]?.id ?? null)
        : images.some((current) => current.id === this.selectedCoverId())
          ? this.selectedCoverId()
          : (images.find((current) => current.isCover)?.id ?? null);
      this.images.set(
        images.map((current, sortOrder) => ({
          ...current,
          sortOrder,
          isCover: current.id === coverId,
        })),
      );
      this.selectedCoverId.set(coverId);
    } catch (deleteError) {
      console.error('Falha ao remover imagem:', deleteError);
      this.mediaError.set('Não foi possível remover a foto. Tente novamente.');
    } finally {
      this.movingImageId.set(null);
    }
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

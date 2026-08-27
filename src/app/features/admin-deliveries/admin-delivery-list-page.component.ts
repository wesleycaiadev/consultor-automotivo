import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AdminAuthService,
  type AdminDeliveryImage,
  type AdminDeliveryListItem,
  type AdminVehicleListItem,
  type DeliveryDraft,
} from '../../core/auth/admin-auth.service';

type DeliveryStatus = DeliveryDraft['status'];

const acceptedMediaTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxMediaSize = 10 * 1024 * 1024;
const maxDeliveryMedia = 8;

@Component({
  selector: 'app-admin-delivery-list-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './admin-delivery-list-page.component.html',
  styleUrl: './admin-delivery-list-page.component.scss',
})
export class AdminDeliveryListPageComponent implements OnInit {
  readonly auth = inject(AdminAuthService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly deliveries = signal<readonly AdminDeliveryListItem[]>([]);
  readonly vehicles = signal<readonly AdminVehicleListItem[]>([]);
  readonly editingDelivery = signal<AdminDeliveryListItem | null>(null);
  readonly isCreating = signal(false);
  readonly images = signal<readonly AdminDeliveryImage[]>([]);
  readonly selectedCoverId = signal<string | null>(null);
  readonly loadingImages = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly mediaError = signal<string | null>(null);
  readonly movingImageId = signal<string | null>(null);
  readonly pendingFiles = signal<readonly File[]>([]);
  readonly uploading = signal(false);
  readonly uploadProgress = signal(0);
  readonly uploadTotal = signal(0);
  readonly uploadPercent = computed(() =>
    this.uploadTotal() > 0 ? (this.uploadProgress() / this.uploadTotal()) * 100 : 0,
  );

  draft: DeliveryDraft = this.emptyDraft();

  async ngOnInit(): Promise<void> {
    try {
      const [deliveries, vehicles] = await Promise.all([
        this.auth.listDeliveries(),
        this.auth.listVehicles(),
      ]);
      this.deliveries.set(deliveries);
      this.vehicles.set(vehicles);
    } catch {
      this.error.set('Não foi possível carregar as entregas. Atualize a página e tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }

  startCreate(): void {
    this.resetEditor();
    this.isCreating.set(true);
    this.draft = this.emptyDraft();
  }

  async openEdit(delivery: AdminDeliveryListItem): Promise<void> {
    this.resetEditor();
    this.editingDelivery.set(delivery);
    this.draft = {
      customer_name: delivery.customer_name,
      vehicle_id: delivery.vehicle_id,
      vehicle_name: delivery.vehicle_name,
      city: delivery.city,
      testimonial: delivery.testimonial,
      delivery_date: delivery.delivery_date,
      status: delivery.status,
    };
    this.loadingImages.set(true);
    try {
      const images = await this.auth.listDeliveryImages(delivery.id);
      this.images.set(images);
      this.selectedCoverId.set(images.find((image) => image.isCover)?.id ?? null);
    } catch {
      this.mediaError.set(
        'As fotos não puderam ser carregadas agora. Os demais dados continuam editáveis.',
      );
    } finally {
      this.loadingImages.set(false);
    }
  }

  closeEditor(): void {
    this.resetEditor();
    this.draft = this.emptyDraft();
  }

  setStatus(status: DeliveryStatus): void {
    this.draft.status = status;
  }

  selectVehicle(vehicleId: string): void {
    this.draft.vehicle_id = vehicleId || null;
    const vehicle = this.vehicles().find((current) => current.id === vehicleId);
    if (vehicle) this.draft.vehicle_name = `${vehicle.brand} ${vehicle.model} ${vehicle.version}`;
  }

  selectCover(imageId: string): void {
    this.selectedCoverId.set(imageId);
  }

  selectMedia(event: Event): void {
    const input = event.target as HTMLInputElement;
    void this.handleSelectedFiles(input.files ? Array.from(input.files) : []);
    input.value = '';
  }

  dropMedia(event: DragEvent): void {
    event.preventDefault();
    void this.handleSelectedFiles(
      event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [],
    );
  }

  async moveImage(imageId: string, direction: -1 | 1): Promise<void> {
    const delivery = this.editingDelivery();
    const images = this.images();
    const index = images.findIndex((image) => image.id === imageId);
    const destination = index + direction;
    if (!delivery || index < 0 || destination < 0 || destination >= images.length) return;

    this.movingImageId.set(imageId);
    this.mediaError.set(null);
    const reordered = [...images];
    [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
    try {
      await this.auth.reorderDeliveryImages(
        delivery.id,
        reordered.map((image) => image.id),
      );
      this.images.set(reordered.map((image, sortOrder) => ({ ...image, sortOrder })));
    } catch (error) {
      console.error('Falha ao reordenar fotos da entrega:', error);
      this.mediaError.set('Não foi possível alterar a ordem das fotos. Tente novamente.');
    } finally {
      this.movingImageId.set(null);
    }
  }

  async removeMedia(image: AdminDeliveryImage): Promise<void> {
    const delivery = this.editingDelivery();
    if (!delivery) return;
    this.movingImageId.set(image.id);
    this.mediaError.set(null);
    try {
      await this.auth.removeDeliveryImage(delivery.id, image);
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
    } catch (error) {
      console.error('Falha ao remover foto da entrega:', error);
      this.mediaError.set('Não foi possível remover a foto. Tente novamente.');
    } finally {
      this.movingImageId.set(null);
    }
  }

  async saveDelivery(): Promise<void> {
    this.saveError.set(null);
    const trimmedDraft = this.normalizedDraft();
    if (!this.isDraftValid(trimmedDraft)) return;

    this.saving.set(true);
    try {
      if (this.isCreating()) {
        const created = await this.auth.createDelivery(
          trimmedDraft,
          this.pendingFiles(),
          (completed, total) => {
            this.uploadProgress.set(completed);
            this.uploadTotal.set(total);
          },
        );
        this.deliveries.update((deliveries) => [created, ...deliveries]);
      } else {
        const delivery = this.editingDelivery();
        if (!delivery) return;
        const updated = await this.auth.updateDelivery(delivery.id, trimmedDraft);
        const initialCoverId = this.images().find((image) => image.isCover)?.id ?? null;
        const selectedCoverId = this.selectedCoverId();
        if (selectedCoverId && selectedCoverId !== initialCoverId) {
          await this.auth.setDeliveryCover(delivery.id, selectedCoverId);
        }
        this.deliveries.update((deliveries) =>
          deliveries.map((current) => (current.id === updated.id ? updated : current)),
        );
      }
      this.closeEditor();
    } catch (error) {
      console.error('Falha ao salvar entrega:', error);
      this.saveError.set('Não foi possível salvar a entrega. Revise os dados e tente novamente.');
    } finally {
      this.saving.set(false);
      this.uploading.set(false);
    }
  }

  async deleteDelivery(delivery: AdminDeliveryListItem): Promise<void> {
    this.deletingId.set(delivery.id);
    this.error.set(null);
    try {
      await this.auth.deleteDelivery(delivery.id);
      this.deliveries.update((deliveries) =>
        deliveries.filter((current) => current.id !== delivery.id),
      );
      if (this.editingDelivery()?.id === delivery.id) this.closeEditor();
    } catch (error) {
      console.error('Falha ao apagar entrega:', error);
      this.error.set('Não foi possível apagar a entrega. Tente novamente.');
    } finally {
      this.deletingId.set(null);
    }
  }

  statusLabel(status: DeliveryStatus): string {
    return status === 'published' ? 'Publicado' : 'Rascunho';
  }

  private async handleSelectedFiles(files: readonly File[]): Promise<void> {
    if (!files.length) return;
    this.mediaError.set(null);
    const validFiles = files.filter(
      (file) => acceptedMediaTypes.has(file.type) && file.size <= maxMediaSize,
    );
    if (validFiles.length !== files.length) {
      this.mediaError.set('Algumas fotos foram ignoradas. Use JPEG, PNG ou WebP com até 10 MB.');
    }
    if (!validFiles.length) return;

    const currentCount = this.isCreating() ? this.pendingFiles().length : this.images().length;
    if (currentCount + validFiles.length > maxDeliveryMedia) {
      this.mediaError.set('O limite é de 8 fotos por entrega.');
      return;
    }

    if (this.isCreating()) {
      this.pendingFiles.update((pending) => [...pending, ...validFiles]);
      return;
    }

    const delivery = this.editingDelivery();
    if (!delivery) return;
    this.uploading.set(true);
    this.uploadProgress.set(0);
    this.uploadTotal.set(validFiles.length);
    try {
      const images = await this.auth.uploadDeliveryImages(
        delivery.id,
        validFiles,
        (completed, total) => {
          this.uploadProgress.set(completed);
          this.uploadTotal.set(total);
        },
      );
      this.images.set(images);
      this.selectedCoverId.set(images.find((image) => image.isCover)?.id ?? null);
    } catch (error) {
      console.error('Falha no upload de fotos da entrega:', error);
      this.mediaError.set('Não foi possível enviar as fotos. Nenhuma imagem parcial foi mantida.');
    } finally {
      this.uploading.set(false);
    }
  }

  private normalizedDraft(): DeliveryDraft {
    return {
      customer_name: this.draft.customer_name.trim(),
      vehicle_id: this.draft.vehicle_id || null,
      vehicle_name: this.draft.vehicle_name.trim(),
      city: this.draft.city.trim(),
      testimonial: this.draft.testimonial.trim(),
      delivery_date: this.draft.delivery_date,
      status: this.draft.status,
    };
  }

  private isDraftValid(draft: DeliveryDraft): boolean {
    const hasImage = this.isCreating() ? this.pendingFiles().length > 0 : this.images().length > 0;
    if (
      !draft.customer_name ||
      !draft.vehicle_name ||
      !draft.city ||
      !draft.testimonial ||
      !draft.delivery_date
    ) {
      this.saveError.set('Preencha cliente, veículo, cidade, frase e data.');
      return false;
    }
    if (draft.status === 'published' && !hasImage) {
      this.saveError.set('Publique uma entrega somente depois de adicionar pelo menos uma foto.');
      return false;
    }
    return true;
  }

  private resetEditor(): void {
    this.editingDelivery.set(null);
    this.isCreating.set(false);
    this.images.set([]);
    this.selectedCoverId.set(null);
    this.loadingImages.set(false);
    this.saveError.set(null);
    this.mediaError.set(null);
    this.movingImageId.set(null);
    this.pendingFiles.set([]);
    this.uploading.set(false);
    this.uploadProgress.set(0);
    this.uploadTotal.set(0);
  }

  private emptyDraft(): DeliveryDraft {
    return {
      customer_name: '',
      vehicle_id: null,
      vehicle_name: '',
      city: '',
      testimonial: '',
      delivery_date: new Date().toISOString().slice(0, 10),
      status: 'draft',
    };
  }
}

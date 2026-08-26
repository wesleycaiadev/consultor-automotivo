import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { type Vehicle } from '../../shared/models/vehicle.model';
import { type VehicleGalleryImage, VehicleGalleryComponent } from './vehicle-gallery.component';

@Component({
  selector: 'app-vehicle-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VehicleGalleryComponent],
  styleUrl: './vehicle-detail-page.component.scss',
  template: `
    <section class="mf-vehicle-detail" aria-labelledby="vehicle-detail-title">
      <div class="mf-container">
        <a class="mf-vehicle-detail__back" href="/showroom">← Voltar ao showroom</a>

        @if (state() === 'loading') {
          <p class="mf-vehicle-detail__status" aria-live="polite">Carregando veículo.</p>
        } @else if (vehicle(); as currentVehicle) {
          <header class="mf-vehicle-detail__header">
            <p>Showroom</p>
            <h1 id="vehicle-detail-title">{{ currentVehicle.brand }} {{ currentVehicle.model }}</h1>
            <span>{{ currentVehicle.version }}</span>
          </header>

          <app-vehicle-gallery [images]="imagesFor(currentVehicle)" />
        } @else {
          <div class="mf-vehicle-detail__status" role="alert">
            <h1 id="vehicle-detail-title">Veículo indisponível.</h1>
            <p>Este veículo não está mais disponível no showroom.</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class VehicleDetailPageComponent {
  readonly #repository = inject<VehicleRepository>(VEHICLE_REPOSITORY);
  readonly #route = inject(ActivatedRoute);
  readonly state = signal<'loading' | 'ready'>('loading');
  readonly vehicle = signal<Vehicle | undefined>(undefined);

  constructor() {
    void this.loadVehicle();
  }

  imagesFor(vehicle: Vehicle): readonly VehicleGalleryImage[] {
    const images = DETAIL_IMAGE_URLS[vehicle.slug] ?? [DETAIL_FALLBACK_IMAGE];

    return images.map((src, index) => ({
      alt: vehicle.images[index]?.altText ?? `${vehicle.brand} ${vehicle.model}`,
      src,
    }));
  }

  private async loadVehicle(): Promise<void> {
    const slug = this.#route.snapshot.paramMap.get('slug');
    this.vehicle.set(slug === null ? undefined : await this.#repository.findPublishedBySlug(slug));
    this.state.set('ready');
  }
}

const DETAIL_IMAGE_URLS: Readonly<Record<string, readonly string[]>> = {
  'porsche-911-carrera-2023': [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85',
  ],
  'range-rover-autobiography-2022': [
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=85',
  ],
};

const DETAIL_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85';

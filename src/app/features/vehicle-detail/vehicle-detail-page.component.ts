import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { SeoService } from '../../core/seo/seo.service';
import { WhatsappComposerService } from '../../core/services/whatsapp-composer.service';
import { type Vehicle } from '../../shared/models/vehicle.model';
import { type VehicleGalleryImage, VehicleGalleryComponent } from './vehicle-gallery.component';

@Component({
  selector: 'app-vehicle-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, VehicleGalleryComponent],
  styleUrl: './vehicle-detail-page.component.scss',
  template: `
    <section class="mf-vehicle-detail" aria-labelledby="vehicle-detail-title">
      <div class="mf-container">
        <a class="mf-vehicle-detail__back" routerLink="/showroom">← Voltar ao showroom</a>

        @if (state() === 'loading') {
          <p class="mf-vehicle-detail__status" aria-live="polite">Carregando veículo.</p>
        } @else if (vehicle(); as currentVehicle) {
          <header class="mf-vehicle-detail__header">
            <p>Showroom</p>
            <h1 id="vehicle-detail-title">{{ currentVehicle.brand }} {{ currentVehicle.model }}</h1>
            <span>{{ currentVehicle.version }}</span>
          </header>

          <app-vehicle-gallery [images]="imagesFor(currentVehicle)" />

          <div class="mf-vehicle-detail__summary">
            <p class="mf-vehicle-detail__price">{{ formatPrice(currentVehicle.price) }}</p>
            <dl class="mf-vehicle-detail__specs">
              <div>
                <dt>Ano</dt>
                <dd>{{ currentVehicle.modelYear }}</dd>
              </div>
              <div>
                <dt>Quilometragem</dt>
                <dd>{{ formatMileage(currentVehicle.mileage) }}</dd>
              </div>
              <div>
                <dt>Câmbio</dt>
                <dd>{{ currentVehicle.transmission }}</dd>
              </div>
              <div>
                <dt>Combustível</dt>
                <dd>{{ currentVehicle.fuel }}</dd>
              </div>
              <div>
                <dt>Cor</dt>
                <dd>{{ currentVehicle.color }}</dd>
              </div>
              <div>
                <dt>Localização</dt>
                <dd>{{ currentVehicle.location }}</dd>
              </div>
              @if (currentVehicle.steering) {
                <div>
                  <dt>Direção</dt>
                  <dd>{{ currentVehicle.steering }}</dd>
                </div>
              }
            </dl>
          </div>

          <div class="mf-vehicle-detail__sections">
            @if (hasDescription(currentVehicle)) {
              <section aria-labelledby="vehicle-overview-title">
                <p>Sobre o veículo</p>
                <h2 id="vehicle-overview-title">Informações do anúncio.</h2>
                <p>{{ currentVehicle.description }}</p>
              </section>
            }

            @if (currentVehicle.equipment.length) {
              <section aria-labelledby="vehicle-equipment-title">
                <p>Equipamentos</p>
                <h2 id="vehicle-equipment-title">Itens deste veículo.</h2>
                <ul>
                  @for (item of currentVehicle.equipment; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              </section>
            }

            @if (currentVehicle.fipePrice !== null) {
              <section aria-labelledby="vehicle-fipe-title">
                <p>Referência FIPE</p>
                <h2 id="vehicle-fipe-title">{{ formatPrice(currentVehicle.fipePrice) }}</h2>
                <p>
                  @if (currentVehicle.fipeReferenceMonth) {
                    {{ currentVehicle.fipeReferenceMonth }}
                  }
                  @if (currentVehicle.fipeReferenceMonth && currentVehicle.fipeCode) {
                    ·
                  }
                  @if (currentVehicle.fipeCode) {
                    Código {{ currentVehicle.fipeCode }}
                  }
                </p>
              </section>
            }
          </div>

          <aside class="mf-vehicle-detail__interest" aria-label="Tenho interesse neste veículo">
            <p>Quer avaliar este veículo com mais contexto?</p>
            <a class="mf-frame" [href]="whatsapp.vehicleInterest(currentVehicle)">
              Tenho interesse neste veículo
            </a>
          </aside>
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
  readonly #seo = inject(SeoService);
  readonly whatsapp = inject(WhatsappComposerService);
  readonly state = signal<'loading' | 'ready'>('loading');
  readonly vehicle = signal<Vehicle | undefined>(undefined);

  constructor() {
    void this.loadVehicle();
  }

  imagesFor(vehicle: Vehicle): readonly VehicleGalleryImage[] {
    const images = vehicle.images
      .filter((image) => image.signedUrl)
      .map((image) => ({
        alt: image.altText || `${vehicle.brand} ${vehicle.model}`,
        src: image.signedUrl!,
      }));

    return images.length
      ? images
      : [{ alt: `${vehicle.brand} ${vehicle.model}`, src: DETAIL_FALLBACK_IMAGE }];
  }

  hasDescription(vehicle: Vehicle): boolean {
    return vehicle.description.trim().length > 0;
  }

  formatMileage(mileage: number): string {
    return `${mileage.toLocaleString('pt-BR')} km`;
  }

  formatPrice(price: number | null): string {
    if (price === null) {
      return 'Consulte';
    }

    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      maximumFractionDigits: 0,
      style: 'currency',
    }).format(price);
  }

  private async loadVehicle(): Promise<void> {
    const slug = this.#route.snapshot.paramMap.get('slug');
    const vehicle = slug === null ? undefined : await this.#repository.findPublishedBySlug(slug);
    this.vehicle.set(vehicle);
    if (vehicle) {
      this.#seo.setVehicle(vehicle, this.imagesFor(vehicle)[0]?.src ?? DETAIL_FALLBACK_IMAGE);
    } else if (slug) {
      this.#seo.setPage({
        title: 'Veículo indisponível — Marques Felipe',
        description: 'Este veículo não está mais disponível no showroom da Marques Felipe.',
        path: `/showroom/${slug}`,
        noindex: true,
      });
    }
    this.state.set('ready');
  }
}

const DETAIL_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85';

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { type Vehicle } from '../../shared/models/vehicle.model';
import { MfSectionMarkerComponent } from '../../shared/ui/section-marker/mf-section-marker.component';
import { MfVehicleCardComponent } from '../../shared/ui/vehicle-card/mf-vehicle-card.component';
import { ShowroomFiltersComponent } from './showroom-filters.component';
import { type ShowroomFilter, ShowroomFiltersStore } from './showroom-filters.store';
import { ShowroomStateComponent } from './showroom-state.component';

type ShowroomPageState = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-showroom-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MfSectionMarkerComponent,
    MfVehicleCardComponent,
    ShowroomFiltersComponent,
    ShowroomStateComponent,
  ],
  styleUrl: './showroom-page.component.scss',
  template: `
    <section class="mf-showroom-page" aria-labelledby="showroom-title">
      <div class="mf-container">
        <header class="mf-showroom-page__header">
          <div class="mf-showroom-page__intro">
            <app-mf-section-marker label="Showroom" />
            <h1 id="showroom-title">Veículos selecionados para uma decisão mais segura.</h1>
            <p>
              Uma seleção reduzida, apresentada com contexto para você avaliar o que realmente faz
              sentido.
            </p>
          </div>
        </header>

        <app-showroom-filters />

        @if (state() === 'loading') {
          <app-showroom-state state="loading" />
        } @else if (state() === 'error') {
          <app-showroom-state state="error" (retry)="loadVehicles()" />
        } @else if (vehicles().length === 0) {
          <app-showroom-state state="empty" />
        } @else if (filteredVehicles().length === 0) {
          <app-showroom-state state="no-results" (clearFilter)="clearFilter()" />
        } @else {
          <p class="mf-showroom-page__result-count" aria-live="polite">
            {{ resultSummary() }}
          </p>

          <div class="mf-showroom-page__grid">
            @for (vehicle of visibleVehicles(); track vehicle.id) {
              <app-mf-vehicle-card
                [imageAlt]="imageAltFor(vehicle)"
                [imageUrl]="imageUrlFor(vehicle)"
                [showTechnicalMetadata]="true"
                [vehicle]="vehicle"
              />
            }
          </div>

          @if (hasMore()) {
            <button class="mf-showroom-page__load-more" type="button" (click)="showMore()">
              Carregar mais veículos
            </button>
          }

          <aside class="mf-showroom-page__finder" aria-labelledby="showroom-finder-title">
            <p>Não encontrou o seu?</p>
            <h2 id="showroom-finder-title">A curadoria pode começar pelo que você precisa.</h2>
            <a class="mf-frame" href="/encontrar-meu-carro">Definir minha busca</a>
          </aside>
        }
      </div>
    </section>
  `,
})
export class ShowroomPageComponent {
  readonly #repository = inject<VehicleRepository>(VEHICLE_REPOSITORY);
  readonly filters = inject(ShowroomFiltersStore);
  readonly state = signal<ShowroomPageState>('loading');
  readonly vehicles = signal<readonly Vehicle[]>([]);
  readonly visibleCount = signal(6);

  readonly filteredVehicles = computed(() => {
    const selectedFilter = this.filters.selected();
    const vehicles = this.vehicles();

    if (selectedFilter === 'all') {
      return vehicles;
    }

    return vehicles.filter((vehicle) => this.categoryFor(vehicle) === selectedFilter);
  });
  readonly visibleVehicles = computed(() => this.filteredVehicles().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleVehicles().length < this.filteredVehicles().length);
  readonly resultSummary = computed(() => {
    const count = this.filteredVehicles().length;
    const noun = count === 1 ? 'veículo selecionado' : 'veículos selecionados';
    const filter = this.filters.selectedOption().label;

    return this.filters.selected() === 'all' ? `${count} ${noun}` : `${count} ${noun} em ${filter}`;
  });

  constructor() {
    void this.loadVehicles();
  }

  async loadVehicles(): Promise<void> {
    this.state.set('loading');

    try {
      this.vehicles.set(await this.#repository.listPublished());
      this.visibleCount.set(6);
      this.state.set('ready');
    } catch {
      this.state.set('error');
    }
  }

  clearFilter(): void {
    this.filters.select('all');
  }

  imageAltFor(vehicle: Vehicle): string {
    return (
      vehicle.images.find((image) => image.isCover)?.altText ?? `${vehicle.brand} ${vehicle.model}`
    );
  }

  imageUrlFor(vehicle: Vehicle): string {
    return vehicle.images.find((image) => image.isCover)?.signedUrl ?? SHOWROOM_FALLBACK_IMAGE;
  }

  showMore(): void {
    this.visibleCount.update((count) => count + 6);
  }

  private categoryFor(vehicle: Vehicle): ShowroomFilter {
    return SHOWROOM_MOCK_CATEGORIES[vehicle.slug] ?? 'all';
  }
}

const SHOWROOM_MOCK_CATEGORIES: Readonly<Record<string, Exclude<ShowroomFilter, 'all'>>> = {
  'range-rover-autobiography-2022': 'suv',
};

const SHOWROOM_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85';

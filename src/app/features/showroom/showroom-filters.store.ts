import { Injectable, computed, signal } from '@angular/core';
import { type MfFilterTab } from '../../shared/ui/filter-tabs/mf-filter-tabs.component';

export const SHOWROOM_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'suv', label: 'SUV' },
  { id: 'sedan', label: 'Sedã' },
  { id: 'hatch', label: 'Hatch' },
  { id: 'pickup', label: 'Picape' },
] as const satisfies readonly MfFilterTab[];

export type ShowroomFilter = (typeof SHOWROOM_FILTERS)[number]['id'];

@Injectable({ providedIn: 'root' })
export class ShowroomFiltersStore {
  readonly options = SHOWROOM_FILTERS;
  readonly selected = signal<ShowroomFilter>('all');
  readonly selectedOption = computed(
    () => this.options.find((option) => option.id === this.selected()) ?? this.options[0],
  );

  select(filter: string): void {
    if (this.isShowroomFilter(filter)) {
      this.selected.set(filter);
    }
  }

  private isShowroomFilter(filter: string): filter is ShowroomFilter {
    return this.options.some((option) => option.id === filter);
  }
}

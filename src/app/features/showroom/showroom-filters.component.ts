import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MfFilterTabsComponent } from '../../shared/ui/filter-tabs/mf-filter-tabs.component';
import { ShowroomFiltersStore } from './showroom-filters.store';

@Component({
  selector: 'app-showroom-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MfFilterTabsComponent],
  template: `
    <app-mf-filter-tabs
      [options]="filters.options"
      [selectedId]="filters.selected()"
      (selectionChange)="filters.select($event)"
    />
  `,
})
export class ShowroomFiltersComponent {
  readonly filters = inject(ShowroomFiltersStore);
}

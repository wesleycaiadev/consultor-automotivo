import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface MfFilterTab {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-mf-filter-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './mf-filter-tabs.component.scss',
  template: `
    <div class="mf-filter-tabs" [attr.aria-label]="ariaLabel()" role="group">
      @for (option of options(); track option.id) {
        <button
          type="button"
          [attr.aria-pressed]="option.id === selectedId()"
          [class.mf-filter-tabs__button--selected]="option.id === selectedId()"
          class="mf-filter-tabs__button"
          (click)="selectionChange.emit(option.id)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
})
export class MfFilterTabsComponent {
  readonly ariaLabel = input('Filtrar veículos');
  readonly options = input.required<readonly MfFilterTab[]>();
  readonly selectedId = input.required<string>();
  readonly selectionChange = output<string>();
}

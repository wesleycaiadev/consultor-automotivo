import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { type FinderCategory, FinderStateService } from './finder-state.service';

const CATEGORY_OPTIONS: readonly { readonly label: string; readonly value: FinderCategory }[] = [
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Hatch', value: 'hatch' },
  { label: 'Picape', value: 'pickup' },
  { label: 'Outro', value: 'other' },
];

@Component({
  selector: 'app-car-finder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './car-finder-page.component.scss',
  template: `
    <section class="mf-finder" aria-labelledby="finder-title">
      <div class="mf-container mf-finder__inner">
        <p class="mf-finder__progress">Etapa 1 de 8</p>
        <h1 id="finder-title">Qual tipo de veículo faz sentido para você?</h1>
        <p class="mf-finder__intro">Começamos por uma decisão simples. Você pode ajustar depois.</p>

        <fieldset class="mf-finder__choices">
          <legend>Tipo de veículo</legend>
          @for (option of categoryOptions; track option.value) {
            <label [class.is-selected]="state.draft().category === option.value">
              <input
                type="radio"
                name="finder-category"
                [value]="option.value"
                [checked]="state.draft().category === option.value"
                (change)="selectCategory(option.value)"
              />
              <span>{{ option.label }}</span>
            </label>
          }
        </fieldset>

        @if (state.draft().category !== null) {
          <p class="mf-finder__selection" aria-live="polite">
            Categoria selecionada: {{ categoryLabel(state.draft().category) }}.
          </p>
        }
      </div>
    </section>
  `,
})
export class CarFinderPageComponent {
  readonly state = inject(FinderStateService);
  readonly categoryOptions = CATEGORY_OPTIONS;

  selectCategory(category: FinderCategory): void {
    this.state.selectCategory(category);
  }

  categoryLabel(category: FinderCategory | null): string {
    return CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? '';
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MfButtonComponent } from '../../shared/ui/button/mf-button.component';
import {
  type FinderCategory,
  type FinderCondition,
  FinderStateService,
} from './finder-state.service';

const CATEGORY_OPTIONS: readonly { readonly label: string; readonly value: FinderCategory }[] = [
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Hatch', value: 'hatch' },
  { label: 'Picape', value: 'pickup' },
  { label: 'Outro', value: 'other' },
];

const BUDGET_OPTIONS = [
  'Até R$ 100 mil',
  'De R$ 100 mil a R$ 150 mil',
  'De R$ 150 mil a R$ 250 mil',
  'De R$ 250 mil a R$ 400 mil',
  'Acima de R$ 400 mil',
] as const;

const CONDITION_OPTIONS: readonly {
  readonly label: string;
  readonly value: FinderCondition;
}[] = [
  { label: 'Novo', value: 'new' },
  { label: 'Seminovo', value: 'used' },
  { label: 'Tanto faz', value: 'either' },
];

@Component({
  selector: 'app-car-finder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MfButtonComponent],
  styleUrl: './car-finder-page.component.scss',
  template: `
    <section class="mf-finder" aria-labelledby="finder-title">
      <div class="mf-container mf-finder__inner">
        @if (state.currentStep() === 'category') {
          <p class="mf-finder__progress">Etapa 1 de 8</p>
          <h1 id="finder-title">Qual tipo de veículo faz sentido para você?</h1>
          <p class="mf-finder__intro">
            Começamos por uma decisão simples. Você pode ajustar depois.
          </p>

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
            <div class="mf-finder__actions">
              <app-mf-button (click)="goNext()">Continuar</app-mf-button>
            </div>
          }
        } @else if (state.currentStep() === 'budget') {
          <p class="mf-finder__progress">Etapa 2 de 8</p>
          <h1 id="finder-title">Qual faixa de investimento você considera?</h1>
          <p class="mf-finder__intro">
            Escolha a faixa mais próxima. Felipe refina os detalhes com você.
          </p>

          <fieldset class="mf-finder__choices">
            <legend>Faixa de investimento</legend>
            @for (option of budgetOptions; track option) {
              <label [class.is-selected]="state.draft().budget === option">
                <input
                  type="radio"
                  name="finder-budget"
                  [value]="option"
                  [checked]="state.draft().budget === option"
                  (change)="selectBudget(option)"
                />
                <span>{{ option }}</span>
              </label>
            }
          </fieldset>

          @if (state.draft().budget !== null) {
            <p class="mf-finder__selection" aria-live="polite">
              Faixa selecionada: {{ state.draft().budget }}.
            </p>
          }

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            @if (state.draft().budget !== null) {
              <app-mf-button (click)="goNext()">Continuar</app-mf-button>
            }
          </div>
        } @else if (state.currentStep() === 'condition') {
          <p class="mf-finder__progress">Etapa 3 de 8</p>
          <h1 id="finder-title">Você prefere um veículo novo ou seminovo?</h1>
          <p class="mf-finder__intro">
            Se as duas opções funcionam para você, deixe Felipe avaliar.
          </p>

          <fieldset class="mf-finder__choices">
            <legend>Condição do veículo</legend>
            @for (option of conditionOptions; track option.value) {
              <label [class.is-selected]="state.draft().condition === option.value">
                <input
                  type="radio"
                  name="finder-condition"
                  [value]="option.value"
                  [checked]="state.draft().condition === option.value"
                  (change)="selectCondition(option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            }
          </fieldset>

          @if (state.draft().condition !== null) {
            <p class="mf-finder__selection" aria-live="polite">
              Preferência selecionada: {{ conditionLabel(state.draft().condition) }}.
            </p>
          }

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            @if (state.draft().condition !== null) {
              <app-mf-button (click)="goNext()">Continuar</app-mf-button>
            }
          </div>
        } @else if (state.currentStep() === 'brand') {
          <p class="mf-finder__progress">Etapa 4 de 8</p>
          <h1 id="finder-title">Tem alguma marca em mente?</h1>
          <p class="mf-finder__intro">Esta resposta é opcional. Uma preferência já é suficiente.</p>

          <div class="mf-finder__field">
            <label for="finder-brand">Marca desejada <span>(opcional)</span></label>
            <input
              #brand
              id="finder-brand"
              name="finder-brand"
              autocomplete="off"
              [value]="state.draft().brand"
              (input)="setBrand(brand.value)"
            />
          </div>

          @if (state.draft().brand) {
            <p class="mf-finder__selection" aria-live="polite">
              Marca informada: {{ state.draft().brand }}.
            </p>
          }

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button variant="secondary" (click)="skipBrand()">Pular marca</app-mf-button>
            <app-mf-button (click)="goNext()">Continuar</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'model') {
          <p class="mf-finder__progress">Etapa 5 de 8</p>
          <h1 id="finder-title">E algum modelo específico?</h1>
          <p class="mf-finder__intro">
            Você pode deixar em branco se ainda estiver explorando opções.
          </p>

          <div class="mf-finder__field">
            <label for="finder-model">Modelo desejado <span>(opcional)</span></label>
            <input
              #model
              id="finder-model"
              name="finder-model"
              autocomplete="off"
              [value]="state.draft().model"
              (input)="setModel(model.value)"
            />
          </div>

          @if (state.draft().model) {
            <p class="mf-finder__selection" aria-live="polite">
              Modelo informado: {{ state.draft().model }}.
            </p>
          }

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button variant="secondary" (click)="skipModel()">
              Sem preferência de modelo
            </app-mf-button>
          </div>
        }
      </div>
    </section>
  `,
})
export class CarFinderPageComponent {
  readonly state = inject(FinderStateService);
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly budgetOptions = BUDGET_OPTIONS;
  readonly conditionOptions = CONDITION_OPTIONS;

  selectCategory(category: FinderCategory): void {
    this.state.selectCategory(category);
  }

  selectBudget(budget: string): void {
    this.state.selectBudget(budget);
  }

  selectCondition(condition: FinderCondition): void {
    this.state.selectCondition(condition);
  }

  setBrand(brand: string): void {
    this.state.setBrand(brand);
  }

  setModel(model: string): void {
    this.state.setModel(model);
  }

  skipBrand(): void {
    this.state.setBrand('');
    this.state.goNext();
  }

  skipModel(): void {
    this.state.setModel('');
  }

  goNext(): void {
    this.state.goNext();
  }

  goBack(): void {
    this.state.goBack();
  }

  categoryLabel(category: FinderCategory | null): string {
    return CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? '';
  }

  conditionLabel(condition: FinderCondition | null): string {
    return CONDITION_OPTIONS.find((option) => option.value === condition)?.label ?? '';
  }
}

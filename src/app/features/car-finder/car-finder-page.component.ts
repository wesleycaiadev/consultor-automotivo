import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  type FinderWhatsappInput,
  WhatsappComposerService,
} from '../../core/services/whatsapp-composer.service';
import { MfButtonComponent } from '../../shared/ui/button/mf-button.component';
import {
  type FinderCategory,
  type FinderCondition,
  type FinderPowertrain,
  type FinderStep,
  type FinderUsage,
  FinderStateService,
} from './finder-state.service';

const CATEGORY_OPTIONS: readonly { readonly label: string; readonly value: FinderCategory }[] = [
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Hatch', value: 'hatch' },
  { label: 'Picape', value: 'pickup' },
  { label: 'Coupé', value: 'coupe' },
  { label: 'Minivan', value: 'minivan' },
  { label: 'Perua / Wagon', value: 'wagon' },
  { label: 'Outro', value: 'other' },
];

const BUDGET_OPTIONS = [
  'Até R$ 50 mil',
  'De R$ 50 mil a R$ 100 mil',
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

const USAGE_OPTIONS: readonly { readonly label: string; readonly value: FinderUsage }[] = [
  { label: 'Rotina urbana', value: 'city' },
  { label: 'Família', value: 'family' },
  { label: 'Viagens', value: 'travel' },
  { label: 'Trabalho', value: 'work' },
  { label: 'Lazer e desempenho', value: 'performance' },
];

const POWERTRAIN_OPTIONS: readonly {
  readonly label: string;
  readonly value: FinderPowertrain;
}[] = [
  { label: 'Econômica (1.0 a 1.3)', value: 'economy' },
  { label: 'Equilibrada (1.4 a 2.0)', value: 'balanced' },
  { label: 'Alta performance (2.0+)', value: 'performance' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Híbrida', value: 'hybrid' },
  { label: 'Elétrica', value: 'electric' },
  { label: 'Sem preferência', value: 'either' },
];

const NOTES_MAX_LENGTH = 500;

interface FinderSummaryItem {
  readonly label: string;
  readonly step: FinderStep;
  readonly value: string;
}

@Component({
  selector: 'app-car-finder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MfButtonComponent],
  styleUrl: './car-finder-page.component.scss',
  template: `
    <section class="mf-finder" aria-labelledby="finder-title">
      <div class="mf-container mf-finder__inner">
        <div
          class="mf-finder__progress-meter"
          role="progressbar"
          aria-label="Progresso da busca"
          aria-valuemin="1"
          aria-valuemax="10"
          [attr.aria-valuenow]="state.stepIndex() + 1"
          [attr.aria-valuetext]="'Etapa ' + (state.stepIndex() + 1) + ' de 10'"
        >
          <span [style.width.%]="state.progress() * 100"></span>
        </div>

        @if (feedback()) {
          <p class="mf-finder__feedback" role="status" aria-live="polite">{{ feedback() }}</p>
        }

        @if (errorMessage()) {
          <p class="mf-finder__error" role="alert">{{ errorMessage() }}</p>
        }

        @if (state.currentStep() === 'category') {
          <p class="mf-finder__progress">Etapa 1 de 10</p>
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
          <p class="mf-finder__progress">Etapa 2 de 10</p>
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
          <p class="mf-finder__progress">Etapa 3 de 10</p>
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
        } @else if (state.currentStep() === 'usage') {
          <p class="mf-finder__progress">Etapa 4 de 10</p>
          <h1 id="finder-title">Como este veículo precisa acompanhar sua rotina?</h1>
          <p class="mf-finder__intro">
            Essa escolha ajuda Felipe a equilibrar espaço, conforto, consumo e desempenho.
          </p>

          <fieldset class="mf-finder__choices">
            <legend>Uso principal <span>(opcional)</span></legend>
            @for (option of usageOptions; track option.value) {
              <label [class.is-selected]="state.draft().usage === option.value">
                <input
                  type="radio"
                  name="finder-usage"
                  [value]="option.value"
                  [checked]="state.draft().usage === option.value"
                  (change)="selectUsage(option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            }
          </fieldset>

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button variant="secondary" (click)="skipUsage()"
              >Pular por enquanto</app-mf-button
            >
            <app-mf-button (click)="goNext()">Continuar</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'powertrain') {
          <p class="mf-finder__progress">Etapa 5 de 10</p>
          <h1 id="finder-title">Há preferência de motorização ou combustível?</h1>
          <p class="mf-finder__intro">
            Não precisa ser técnico: informe o que faz sentido para seu uso e Felipe refina a
            escolha.
          </p>

          <fieldset class="mf-finder__choices">
            <legend>Motorização <span>(opcional)</span></legend>
            @for (option of powertrainOptions; track option.value) {
              <label [class.is-selected]="state.draft().powertrain === option.value">
                <input
                  type="radio"
                  name="finder-powertrain"
                  [value]="option.value"
                  [checked]="state.draft().powertrain === option.value"
                  (change)="selectPowertrain(option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            }
          </fieldset>

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button variant="secondary" (click)="skipPowertrain()"
              >Pular por enquanto</app-mf-button
            >
            <app-mf-button (click)="goNext()">Continuar</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'brand') {
          <p class="mf-finder__progress">Etapa 6 de 10</p>
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
          <p class="mf-finder__progress">Etapa 7 de 10</p>
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
            <app-mf-button (click)="goNext()">Continuar</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'notes') {
          <p class="mf-finder__progress">Etapa 8 de 10</p>
          <h1 id="finder-title">Há algo importante para Felipe saber?</h1>
          <p class="mf-finder__intro">
            Conte o que pode ajudar na curadoria: uso, prioridades ou detalhes desejados.
          </p>

          <div class="mf-finder__field">
            <label for="finder-notes">Observações <span>(opcional)</span></label>
            <textarea
              #notes
              id="finder-notes"
              name="finder-notes"
              autocomplete="off"
              enterkeyhint="next"
              [maxLength]="notesMaxLength"
              [value]="state.draft().notes"
              aria-describedby="finder-notes-helper"
              (input)="setNotes(notes.value)"
            ></textarea>
            <p id="finder-notes-helper" class="mf-finder__helper">
              Até {{ notesMaxLength }} caracteres. Pode deixar em branco.
            </p>
            <p class="mf-finder__count" aria-live="polite">
              {{ state.draft().notes.length }} de {{ notesMaxLength }}
            </p>
          </div>

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button (click)="goNext()">Revisar busca</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'summary') {
          <p class="mf-finder__progress">Etapa 9 de 10</p>
          <h1 id="finder-title">Confira sua busca antes de enviar.</h1>
          <p class="mf-finder__intro">
            Felipe receberá exatamente as preferências abaixo. Você pode ajustar qualquer uma.
          </p>

          <dl class="mf-finder__summary" aria-label="Resumo da busca">
            @for (item of summaryItems(); track item.step) {
              <div class="mf-finder__summary-item">
                <div>
                  <dt>{{ item.label }}</dt>
                  <dd [class.is-empty]="item.value === 'Não informado'">{{ item.value }}</dd>
                </div>
                <button
                  class="mf-finder__edit"
                  type="button"
                  [attr.aria-label]="'Editar ' + item.label"
                  (click)="edit(item.step)"
                >
                  Editar
                </button>
              </div>
            }
          </dl>

          <div class="mf-finder__actions">
            <app-mf-button variant="secondary" (click)="goBack()">Voltar</app-mf-button>
            <app-mf-button (click)="goNext()">Continuar</app-mf-button>
          </div>
        } @else if (state.currentStep() === 'whatsapp') {
          <p class="mf-finder__progress">Etapa 10 de 10</p>
          <h1 id="finder-title">Entendi o que você procura.</h1>
          <p class="mf-finder__intro">
            Envie sua busca para Felipe e ele seguirá a conversa pelo WhatsApp.
          </p>

          <div class="mf-finder__actions">
            <a
              class="mf-finder__whatsapp mf-frame"
              [href]="whatsapp.finderSearch(finderWhatsappInput())"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar minha busca para Felipe →
            </a>
          </div>
        }
      </div>
    </section>
  `,
})
export class CarFinderPageComponent {
  readonly state = inject(FinderStateService);
  readonly whatsapp = inject(WhatsappComposerService);
  readonly errorMessage = signal<string | null>(null);
  readonly feedback = signal<string | null>(null);
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly budgetOptions = BUDGET_OPTIONS;
  readonly conditionOptions = CONDITION_OPTIONS;
  readonly powertrainOptions = POWERTRAIN_OPTIONS;
  readonly usageOptions = USAGE_OPTIONS;
  readonly notesMaxLength = NOTES_MAX_LENGTH;

  selectCategory(category: FinderCategory): void {
    this.state.selectCategory(category);
    this.clearMessages();
  }

  selectBudget(budget: string): void {
    this.state.selectBudget(budget);
    this.clearMessages();
  }

  selectCondition(condition: FinderCondition): void {
    this.state.selectCondition(condition);
    this.clearMessages();
  }

  selectUsage(usage: FinderUsage): void {
    this.state.selectUsage(usage);
    this.clearMessages();
  }

  selectPowertrain(powertrain: FinderPowertrain): void {
    this.state.selectPowertrain(powertrain);
    this.clearMessages();
  }

  setBrand(brand: string): void {
    this.state.setBrand(brand);
    this.clearMessages();
  }

  setModel(model: string): void {
    this.state.setModel(model);
    this.clearMessages();
  }

  setNotes(notes: string): void {
    this.state.setNotes(notes);
    this.clearMessages();
  }

  skipBrand(): void {
    this.state.setBrand('');
    this.feedback.set('Sem preferência de marca registrada.');
    this.errorMessage.set(null);
    this.state.goNext();
  }

  skipModel(): void {
    this.state.setModel('');
    this.feedback.set('Sem preferência de modelo registrada.');
    this.errorMessage.set(null);
    this.state.goNext();
  }

  skipUsage(): void {
    this.state.selectUsage(null);
    this.feedback.set('Sem preferência de uso registrada.');
    this.errorMessage.set(null);
    this.state.goNext();
  }

  skipPowertrain(): void {
    this.state.selectPowertrain(null);
    this.feedback.set('Sem preferência de motorização registrada.');
    this.errorMessage.set(null);
    this.state.goNext();
  }

  edit(step: FinderStep): void {
    this.state.goTo(step);
  }

  goNext(): void {
    if (this.state.goNext()) {
      this.clearMessages();
      return;
    }

    const message = this.advanceErrorMessage();
    this.errorMessage.set(message);
    this.feedback.set(null);
    console.warn('[Car Finder] avanço bloqueado', { step: this.state.currentStep(), message });
  }

  goBack(): void {
    this.state.goBack();
    this.clearMessages();
  }

  categoryLabel(category: FinderCategory | null): string {
    return CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? '';
  }

  conditionLabel(condition: FinderCondition | null): string {
    return CONDITION_OPTIONS.find((option) => option.value === condition)?.label ?? '';
  }

  usageLabel(usage: FinderUsage | null): string {
    return USAGE_OPTIONS.find((option) => option.value === usage)?.label ?? 'Não informado';
  }

  powertrainLabel(powertrain: FinderPowertrain | null): string {
    return (
      POWERTRAIN_OPTIONS.find((option) => option.value === powertrain)?.label ?? 'Não informado'
    );
  }

  summaryItems(): readonly FinderSummaryItem[] {
    const draft = this.state.draft();

    return [
      { label: 'Tipo de veículo', step: 'category', value: this.categoryLabel(draft.category) },
      { label: 'Faixa de investimento', step: 'budget', value: draft.budget ?? 'Não informado' },
      { label: 'Condição', step: 'condition', value: this.conditionLabel(draft.condition) },
      { label: 'Uso principal', step: 'usage', value: this.usageLabel(draft.usage) },
      { label: 'Motorização', step: 'powertrain', value: this.powertrainLabel(draft.powertrain) },
      { label: 'Marca', step: 'brand', value: draft.brand || 'Não informado' },
      { label: 'Modelo', step: 'model', value: draft.model || 'Não informado' },
      { label: 'Observações', step: 'notes', value: draft.notes || 'Não informado' },
    ];
  }

  finderWhatsappInput(): FinderWhatsappInput {
    const draft = this.state.draft();

    return {
      brand: draft.brand,
      budget: draft.budget ?? '',
      category: this.categoryLabel(draft.category),
      condition: this.conditionLabel(draft.condition),
      model: draft.model,
      notes: draft.notes,
      powertrain: this.powertrainLabel(draft.powertrain),
      usage: this.usageLabel(draft.usage),
    };
  }

  private advanceErrorMessage(): string {
    switch (this.state.currentStep()) {
      case 'category':
        return 'Escolha um tipo de veículo para continuar.';
      case 'budget':
        return 'Escolha uma faixa de investimento para continuar.';
      case 'condition':
        return 'Escolha a condição do veículo para continuar.';
      default:
        return 'Não foi possível avançar agora. Tente novamente.';
    }
  }

  private clearMessages(): void {
    this.errorMessage.set(null);
    this.feedback.set(null);
  }
}

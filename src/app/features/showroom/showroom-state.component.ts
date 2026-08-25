import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ShowroomState = 'loading' | 'empty' | 'error' | 'no-results';

@Component({
  selector: 'app-showroom-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './showroom-state.component.scss',
  template: `
    @switch (state()) {
      @case ('loading') {
        <section
          class="mf-showroom-state mf-showroom-state--loading"
          aria-busy="true"
          aria-live="polite"
        >
          <p class="mf-showroom-state__eyebrow">Showroom</p>
          <h2>Preparando veículos selecionados.</h2>
          <p>Carregando o showroom.</p>
          <div class="mf-showroom-state__skeletons" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      }
      @case ('empty') {
        <section class="mf-showroom-state" aria-labelledby="showroom-empty-title">
          <p class="mf-showroom-state__eyebrow">Showroom</p>
          <h2 id="showroom-empty-title">Ainda não há veículos disponíveis.</h2>
          <p>Conte ao Felipe o que você procura e a curadoria começa por você.</p>
          <a class="mf-showroom-state__action mf-frame" href="/encontrar-meu-carro">
            Encontrar meu carro
          </a>
        </section>
      }
      @case ('error') {
        <section class="mf-showroom-state" aria-labelledby="showroom-error-title" role="alert">
          <p class="mf-showroom-state__eyebrow">Não foi possível carregar</p>
          <h2 id="showroom-error-title">O showroom não respondeu como esperado.</h2>
          <p>Tente novamente. Se o problema continuar, fale diretamente com Felipe.</p>
          <button class="mf-showroom-state__action mf-frame" type="button" (click)="retry.emit()">
            Tentar novamente
          </button>
        </section>
      }
      @case ('no-results') {
        <section class="mf-showroom-state" aria-labelledby="showroom-no-results-title">
          <p class="mf-showroom-state__eyebrow">Sua seleção</p>
          <h2 id="showroom-no-results-title">Nenhum veículo corresponde a este filtro.</h2>
          <p>Você pode voltar a ver todos os veículos ou iniciar uma busca personalizada.</p>
          <div class="mf-showroom-state__actions">
            <button
              class="mf-showroom-state__action mf-frame"
              type="button"
              (click)="clearFilter.emit()"
            >
              Ver todos os veículos
            </button>
            <a class="mf-showroom-state__secondary" href="/encontrar-meu-carro">
              Encontrar meu carro
            </a>
          </div>
        </section>
      }
    }
  `,
})
export class ShowroomStateComponent {
  readonly state = input.required<ShowroomState>();
  readonly clearFilter = output<void>();
  readonly retry = output<void>();
}

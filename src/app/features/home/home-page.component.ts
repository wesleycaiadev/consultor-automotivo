import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MfAccordionItemComponent } from '../../shared/ui/accordion/mf-accordion-item.component';
import { MfSectionMarkerComponent } from '../../shared/ui/section-marker/mf-section-marker.component';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MfAccordionItemComponent, MfSectionMarkerComponent],
  template: `
    <section class="mf-hero" aria-labelledby="hero-title">
      <div class="mf-container mf-hero__inner">
        <div class="mf-hero__content">
          <p class="mf-hero__eyebrow"><span aria-hidden="true"></span> Curadoria automotiva</p>
          <h1 id="hero-title" class="mf-hero__title">
            O carro certo.<br />
            Sem o risco da<br />
            <em>escolha errada.</em>
          </h1>
          <p class="mf-hero__description">
            Marques Felipe ajuda você a encontrar, avaliar e escolher seu próximo veículo com mais
            segurança, procedência e clareza.
          </p>
          <div class="mf-hero__actions">
            <a class="mf-hero__primary mf-frame" href="/encontrar-meu-carro">Encontrar meu carro</a>
            <a class="mf-hero__secondary" href="/showroom">Ver showroom</a>
          </div>
        </div>

        <figure class="mf-hero__media">
          <img
            class="mf-hero__photo mf-frame mf-frame--large"
            src="/images/felipe-hero.jpeg"
            alt="Felipe, consultor da Marques Felipe Curadoria Automotiva"
            width="853"
            height="1280"
            fetchpriority="high"
          />
          <figcaption>MF / 2024</figcaption>
        </figure>
      </div>
    </section>

    <section class="mf-problem mf-section" aria-labelledby="problem-title">
      <div class="mf-container mf-problem__inner">
        <div class="mf-problem__intro">
          <app-mf-section-marker label="O risco oculto" />
          <h2 id="problem-title">Comprar um carro não deveria ser uma aposta.</h2>
          <p>
            Antes da chave, existem decisões que não aparecem em um anúncio. É nelas que uma boa
            compra se confirma — ou se perde.
          </p>
        </div>

        <div class="mf-problem__list">
          @for (risk of risks; track risk.id) {
            <app-mf-accordion-item [id]="risk.id" [title]="risk.title">
              <p>{{ risk.copy }}</p>
            </app-mf-accordion-item>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomePageComponent {
  readonly risks = [
    {
      id: 'procedencia',
      title: 'Procedência',
      copy: 'Origem, proprietários anteriores e registros precisam sustentar a história do veículo.',
    },
    {
      id: 'historico',
      title: 'Histórico',
      copy: 'Revisões, sinistros e pendências não podem ficar escondidos atrás de uma boa aparência.',
    },
    {
      id: 'preco',
      title: 'Preço',
      copy: 'Valor anunciado só faz sentido quando conversa com condição, mercado e custo de manutenção.',
    },
    {
      id: 'avaliacao',
      title: 'Avaliação',
      copy: 'Uma inspeção criteriosa revela detalhes que uma volta rápida não consegue mostrar.',
    },
    {
      id: 'manutencao',
      title: 'Manutenção',
      copy: 'O estado de uso e os próximos serviços definem o custo real depois da compra.',
    },
    {
      id: 'documentacao',
      title: 'Documentação',
      copy: 'Débitos, restrições e transferências devem estar claros antes de qualquer negociação.',
    },
    {
      id: 'revenda',
      title: 'Revenda',
      copy: 'Liquidez e aceitação futura também fazem parte de uma escolha segura hoje.',
    },
  ] as const;
}

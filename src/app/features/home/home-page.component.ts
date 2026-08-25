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
            <a class="mf-hero__primary mf-frame" href="https://wa.me/557998709362"
              >Encontrar meu carro</a
            >
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

    <section id="curadoria" class="mf-curation mf-section" aria-labelledby="curation-title">
      <div class="mf-container mf-curation__inner">
        <div class="mf-curation__intro">
          <app-mf-section-marker label="A curadoria" />
          <h2 id="curation-title">Uma escolha segura é construída antes da negociação.</h2>
          <p>
            Um processo objetivo para entender o que importa, filtrar opções e chegar à decisão com
            mais clareza.
          </p>
        </div>

        <ol class="mf-curation__steps">
          @for (step of steps; track step.number) {
            <li>
              <span aria-hidden="true">{{ step.number }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.copy }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="mf-showroom-preview mf-section" aria-labelledby="showroom-preview-title">
      <div class="mf-container">
        <div class="mf-showroom-preview__header">
          <div>
            <app-mf-section-marker label="Showroom" />
            <h2 id="showroom-preview-title">Veículos selecionados.</h2>
          </div>
          <a class="mf-editorial-link" href="/showroom">Explorar showroom</a>
        </div>

        <div class="mf-showroom-preview__grid">
          @for (vehicle of vehicles; track vehicle.model) {
            <article class="mf-vehicle-preview">
              <img
                [src]="vehicle.image"
                [alt]="vehicle.model"
                width="1200"
                height="800"
                loading="lazy"
              />
              <div class="mf-vehicle-preview__meta">
                <h3>{{ vehicle.model }}</h3>
                <p>{{ vehicle.details }}</p>
                <span>{{ vehicle.price }}</span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="mf-finder-cta mf-section" aria-labelledby="finder-cta-title">
      <div class="mf-container mf-finder-cta__inner">
        <p class="mf-finder-cta__eyebrow">Não encontrou o seu?</p>
        <div class="mf-finder-cta__content">
          <h2 id="finder-cta-title">Conte ao Felipe o carro que você procura.</h2>
          <p>
            Você não precisa navegar por centenas de anúncios. Informe suas prioridades e receba uma
            busca conduzida com critério.
          </p>
        </div>
        <a class="mf-finder-cta__action mf-frame" href="https://wa.me/557998709362">
          Iniciar minha busca
        </a>
      </div>
    </section>

    <section
      id="entregas"
      class="mf-deliveries-preview mf-section"
      aria-labelledby="deliveries-preview-title"
    >
      <div class="mf-container">
        <div class="mf-deliveries-preview__header">
          <div>
            <app-mf-section-marker label="Entregas" />
            <h2 id="deliveries-preview-title">A escolha certa continua na estrada.</h2>
          </div>
          <a class="mf-editorial-link" href="/#entregas">Ver todas as entregas</a>
        </div>

        <div class="mf-deliveries-preview__list">
          @for (delivery of deliveries; track delivery.customer) {
            <article class="mf-delivery-preview">
              <img
                [src]="delivery.image"
                [alt]="delivery.alt"
                width="1200"
                height="900"
                loading="lazy"
              />
              <div class="mf-delivery-preview__content">
                <p class="mf-delivery-preview__location">{{ delivery.city }}</p>
                <blockquote>{{ delivery.testimonial }}</blockquote>
                <footer>
                  <strong>{{ delivery.customer }}</strong>
                  <span>{{ delivery.vehicle }}</span>
                </footer>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section id="sobre" class="mf-about-preview mf-section" aria-labelledby="about-preview-title">
      <div class="mf-container mf-about-preview__inner">
        <figure class="mf-about-preview__media">
          <img
            class="mf-frame"
            src="/images/felipe-hero.jpeg"
            alt="Felipe, consultor da Marques Felipe Curadoria Automotiva"
            width="853"
            height="1280"
            loading="lazy"
          />
        </figure>

        <div class="mf-about-preview__content">
          <app-mf-section-marker label="Sobre Felipe" />
          <h2 id="about-preview-title">Escolher bem é enxergar o que não está à primeira vista.</h2>
          <p>
            Felipe conduz cada busca com atenção ao contexto de quem vai dirigir, à história do
            veículo e ao que precisa fazer sentido depois da entrega.
          </p>
          <a class="mf-editorial-link" href="/#sobre">Conhecer a forma de trabalhar</a>
        </div>
      </div>
    </section>

    <section id="fale-com-felipe" class="mf-final-cta mf-section" aria-labelledby="final-cta-title">
      <div class="mf-container mf-final-cta__inner">
        <p class="mf-final-cta__eyebrow">Próxima escolha</p>
        <h2 id="final-cta-title">Uma boa conversa pode ser o começo do carro certo.</h2>
        <a class="mf-final-cta__action mf-frame" href="https://wa.me/557998709362"
          >Falar com Felipe</a
        >
      </div>
    </section>

    <footer class="mf-footer">
      <div class="mf-container mf-footer__inner">
        <div class="mf-footer__brand">
          <p>Marques Felipe</p>
          <span>Escolher bem começa antes da chave.</span>
        </div>

        <nav class="mf-footer__links" aria-label="Navegação do rodapé">
          <a href="/#curadoria">Curadoria</a>
          <a href="/showroom">Showroom</a>
          <a href="/#entregas">Entregas</a>
        </nav>

        <address class="mf-footer__contact">
          <a href="https://wa.me/557998709362">WhatsApp</a>
          <a href="https://www.instagram.com/">Instagram</a>
          <span>Aracaju — SE</span>
        </address>

        <div class="mf-footer__bottom">
          <small>© 2026 Marques Felipe</small>
        </div>
      </div>
    </footer>
  `,
})
export class HomePageComponent {
  readonly deliveries = [
    {
      customer: 'Eduardo',
      vehicle: 'Porsche Macan GTS',
      city: 'Aracaju — SE',
      testimonial:
        '“A decisão ficou clara quando cada detalhe do carro e da compra passou a fazer sentido.”',
      alt: 'Cliente ao lado de um Porsche durante a entrega do veículo',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    },
    {
      customer: 'Marina',
      vehicle: 'Range Rover Velar',
      city: 'Maceió — AL',
      testimonial:
        '“Encontramos um carro que conversa com a minha rotina, sem abrir mão da tranquilidade.”',
      alt: 'Range Rover estacionado em frente a uma residência',
      image:
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85',
    },
  ] as const;

  readonly vehicles = [
    {
      model: 'Porsche 911 Carrera',
      details: '2023 · 3.000 km · PDK',
      price: 'Consulte',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    },
    {
      model: 'Range Rover Autobiography',
      details: '2022 · 18.500 km · Automático',
      price: 'R$ 1.450.000',
      image:
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85',
    },
    {
      model: 'BMW M3 Competition',
      details: '2023 · 12.000 km · Automático',
      price: 'Consulte',
      image:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
    },
  ] as const;

  readonly steps = [
    {
      number: '01',
      title: 'Perfil',
      copy: 'Entendemos sua rotina, prioridades e o que uma boa compra precisa resolver.',
    },
    {
      number: '02',
      title: 'Curadoria',
      copy: 'Filtramos opções coerentes com seu contexto, sem excesso de escolhas ou ruído.',
    },
    {
      number: '03',
      title: 'Validação',
      copy: 'Procedência, condição e custo real entram na avaliação antes de avançar.',
    },
    {
      number: '04',
      title: 'Negociação',
      copy: 'A decisão chega à mesa com referência de valor, critério e segurança.',
    },
  ] as const;

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

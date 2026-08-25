import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  `,
})
export class HomePageComponent {}

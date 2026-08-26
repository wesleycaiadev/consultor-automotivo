import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard-page',
  template: `<section class="dashboard">
    <p>VISÃO GERAL</p>
    <h1>Operação Marques Felipe</h1>
    <div>
      <article><span>Showroom</span><strong>Gerencie veículos e imagens.</strong></article>
      <article><span>Entregas</span><strong>Publique histórias e provas sociais.</strong></article>
      <article><span>Feedbacks</span><strong>Organize depoimentos aprovados.</strong></article>
    </div>
  </section>`,
  styles: [
    `
      .dashboard {
        padding: var(--space-8);
      }
      h1 {
        font: 400 var(--type-display-lg) var(--font-display);
      }
      .dashboard > div {
        display: grid;
        gap: var(--space-4);
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      article {
        display: grid;
        gap: var(--space-3);
        padding: var(--space-6);
        border: 1px solid var(--mf-silver);
      }
      @media (max-width: 48rem) {
        .dashboard {
          padding: var(--space-5);
        }
        .dashboard > div {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AdminDashboardPageComponent {}

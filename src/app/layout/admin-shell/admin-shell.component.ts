import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/auth/admin-auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterOutlet],
  template: `<div class="admin">
    <aside>
      <a class="admin-brand" routerLink="/admin" aria-label="Marques Felipe — Administração">
        <strong>MARQUES FELIPE</strong><small>ADMINISTRAÇÃO</small>
      </a>
      <nav>
        <a routerLink="/admin">Visão geral</a><a routerLink="/admin/veiculos">Showroom</a
        ><a routerLink="/admin/entregas">Entregas</a><a routerLink="/admin/feedbacks">Feedbacks</a
        ><a routerLink="/admin/configuracoes">Configurações</a>
      </nav>
      <button (click)="auth.signOut()">Sair</button>
    </aside>
    <main><router-outlet /></main>
  </div>`,
  styles: [
    `
      .admin {
        display: grid;
        min-block-size: 100vh;
        background: var(--mf-paper);
        grid-template-columns: 15rem 1fr;
      }
      .admin aside {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        padding: var(--space-6);
        background: var(--mf-ink);
        color: var(--mf-paper);
      }
      .admin a {
        color: inherit;
        text-decoration: none;
      }

      .admin-brand {
        display: grid;
      }
      .admin-brand strong,
      .admin-brand small {
        font-family: var(--font-ui);
        letter-spacing: var(--tracking-label);
      }
      .admin-brand strong {
        font-size: var(--type-label);
      }
      .admin-brand small {
        font-size: 0.625rem;
        opacity: 0.7;
      }
      .admin nav {
        display: grid;
        gap: var(--space-4);
      }
      .admin button {
        margin-top: auto;
      }
      @media (max-width: 48rem) {
        .admin {
          grid-template-columns: 1fr;
        }
        .admin aside {
          gap: var(--space-4);
        }
        .admin nav {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class AdminShellComponent {
  readonly auth = inject(AdminAuthService);
}

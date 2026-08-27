import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/auth/admin-auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `<div class="admin">
    <aside>
      <a class="admin-brand" routerLink="/admin" aria-label="Marques Felipe — Administração">
        <strong>MARQUES FELIPE</strong><small>ADMINISTRAÇÃO</small>
      </a>
      <nav>
        <a
          routerLink="/admin"
          routerLinkActive="is-active"
          [routerLinkActiveOptions]="{ exact: true }"
          ariaCurrentWhenActive="page"
          >Visão geral</a
        ><a routerLink="/admin/veiculos" routerLinkActive="is-active" ariaCurrentWhenActive="page"
          >Showroom</a
        ><a routerLink="/admin/entregas" routerLinkActive="is-active" ariaCurrentWhenActive="page"
          >Entregas</a
        ><a routerLink="/admin/feedbacks" routerLinkActive="is-active" ariaCurrentWhenActive="page"
          >Feedbacks</a
        ><a
          routerLink="/admin/configuracoes"
          routerLinkActive="is-active"
          ariaCurrentWhenActive="page"
          >Configurações</a
        >
      </nav>
      <button type="button" (click)="auth.signOut()">Sair</button>
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
      .admin nav a {
        padding-block: var(--space-2);
        border-block-end: 1px solid transparent;
      }
      .admin nav a.is-active {
        border-color: var(--mf-oxide);
        color: var(--mf-paper);
      }
      .admin button {
        margin-top: auto;
      }
      .admin a:focus-visible,
      .admin button:focus-visible {
        outline: 2px solid var(--mf-oxide);
        outline-offset: 3px;
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

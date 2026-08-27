import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../core/auth/admin-auth.service';

@Component({
  selector: 'app-admin-login-page',
  imports: [FormsModule],
  template: `<main class="login">
    <form (ngSubmit)="submit()" [attr.aria-busy]="loading()">
      <p>MARQUES FELIPE</p>
      <h1>Acesso administrativo</h1>
      <label
        >E-mail<input
          name="email"
          [(ngModel)]="email"
          type="email"
          autocomplete="email"
          required /></label
      ><label
        >Senha<input
          name="password"
          [(ngModel)]="password"
          type="password"
          autocomplete="current-password"
          required
      /></label>
      @if (auth.error()) {
        <p role="alert">{{ auth.error() }}</p>
      }
      <button type="submit" [disabled]="loading()">{{ loading() ? 'Entrando…' : 'Entrar' }}</button>
    </form>
  </main>`,
  styles: [
    `
      .login {
        display: grid;
        min-block-size: 100vh;
        place-items: center;
        padding: var(--space-5);
        background: var(--mf-paper);
      }
      form {
        display: grid;
        inline-size: min(100%, 26rem);
        gap: var(--space-4);
        padding: var(--space-8);
        border: 1px solid var(--mf-silver);
      }
      h1 {
        margin: 0;
        font: 400 var(--type-display-sm)/var(--leading-display) var(--font-display);
      }
      label {
        display: grid;
        gap: var(--space-2);
        font: 600 var(--type-label) var(--font-ui);
        text-transform: uppercase;
      }
      input {
        min-block-size: 3rem;
        padding-inline: var(--space-3);
        border: 1px solid var(--mf-silver);
        background: transparent;
      }
      button {
        min-block-size: 3rem;
        border: 0;
        background: var(--mf-ink);
        color: var(--mf-paper);
        font-weight: 600;
      }
      input:focus-visible,
      button:focus-visible {
        outline: 2px solid var(--mf-oxide);
        outline-offset: 2px;
      }
    `,
  ],
})
export class AdminLoginPageComponent {
  readonly auth = inject(AdminAuthService);
  readonly router = inject(Router);
  email = '';
  password = '';
  readonly loading = signal(false);
  async submit() {
    this.loading.set(true);
    if (await this.auth.signIn(this.email, this.password))
      await this.router.navigateByUrl('/admin');
    this.loading.set(false);
  }
}

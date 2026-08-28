import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MfNavbarComponent } from './mf-navbar.component';

@Component({
  selector: 'app-public-shell',
  imports: [MfNavbarComponent, RouterOutlet],
  template: `
    <a class="mf-skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
    <app-mf-navbar />
    <main id="conteudo-principal" tabindex="-1">
      <router-outlet />
    </main>
  `,
})
export class PublicShellComponent {}

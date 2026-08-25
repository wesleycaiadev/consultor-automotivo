import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MfNavbarComponent } from './mf-navbar.component';

@Component({
  selector: 'app-public-shell',
  imports: [MfNavbarComponent, RouterOutlet],
  template: `
    <app-mf-navbar />
    <main>
      <router-outlet />
    </main>
  `,
})
export class PublicShellComponent {}

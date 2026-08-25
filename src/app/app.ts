import { Component } from '@angular/core';
import { PublicShellComponent } from './layout/public-shell/public-shell.component';

@Component({
  imports: [PublicShellComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}

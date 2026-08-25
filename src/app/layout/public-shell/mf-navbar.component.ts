import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  inject,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-mf-navbar',
  templateUrl: './mf-navbar.component.html',
})
export class MfNavbarComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly firstMobileLink = viewChild<ElementRef<HTMLAnchorElement>>('firstMobileLink');
  private readonly menuTrigger = viewChild.required<ElementRef<HTMLButtonElement>>('menuTrigger');

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 12);
    }
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }

    this.menuOpen.set(true);
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => this.firstMobileLink()?.nativeElement.focus());
    }
  }

  closeMenu(restoreFocus = false): void {
    this.menuOpen.set(false);
    if (restoreFocus && isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => this.menuTrigger().nativeElement.focus());
    }
  }
}

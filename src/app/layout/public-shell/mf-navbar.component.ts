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
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mf-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mf-navbar.component.html',
})
export class MfNavbarComponent {
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly firstMobileLink = viewChild<ElementRef<HTMLAnchorElement>>('firstMobileLink');
  private readonly menuTrigger = viewChild.required<ElementRef<HTMLButtonElement>>('menuTrigger');
  private readonly mobileMenu = viewChild<ElementRef<HTMLElement>>('mobileMenu');

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu(true);
      return;
    }

    if (event.key === 'Tab') {
      this.trapMenuFocus(event);
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

  private trapMenuFocus(event: KeyboardEvent): void {
    const controls = Array.from(
      this.mobileMenu()?.nativeElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      ) ?? [],
    );
    const firstControl = controls[0];
    const lastControl = controls.at(-1);

    if (firstControl === undefined || lastControl === undefined) {
      return;
    }

    const activeElement = this.document.activeElement;
    if (event.shiftKey && activeElement === firstControl) {
      event.preventDefault();
      lastControl.focus();
    }

    if (!event.shiftKey && activeElement === lastControl) {
      event.preventDefault();
      firstControl.focus();
    }
  }
}

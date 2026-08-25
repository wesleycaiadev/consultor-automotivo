import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MfNavbarComponent } from './mf-navbar.component';

describe('MfNavbarComponent', () => {
  it('opens and closes the mobile menu with keyboard support', async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(MfNavbarComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.mf-navbar__menu-trigger',
    ) as HTMLButtonElement;
    const wordmark = fixture.nativeElement.querySelector(
      '.mf-navbar__brand-wordmark',
    ) as HTMLSpanElement;

    expect(wordmark.textContent).toContain('MARQUES FELIPE');

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeFalsy();
  });
});

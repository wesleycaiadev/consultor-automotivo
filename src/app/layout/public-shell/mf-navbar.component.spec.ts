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
    expect(trigger.getAttribute('aria-label')).toBe('Fechar menu');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-label')).toBe('Abrir menu');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it('keeps keyboard focus inside the mobile menu', async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(MfNavbarComponent);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.mf-navbar__menu-trigger') as HTMLButtonElement).click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button'));
    const firstControl = controls[0];
    const lastControl = controls.at(-1);

    if (!firstControl || !lastControl) {
      throw new Error('Controles do menu mobile não encontrados.');
    }

    lastControl.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }));
    expect(document.activeElement).toBe(firstControl);

    firstControl.focus();
    document.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Tab', shiftKey: true }),
    );
    expect(document.activeElement).toBe(lastControl);
  });
});

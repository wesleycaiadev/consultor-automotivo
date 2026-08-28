import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PublicShellComponent } from './public-shell.component';

describe('PublicShellComponent', () => {
  it('provides a skip link to the main content landmark', async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(PublicShellComponent);
    fixture.detectChanges();

    const skipLink = fixture.nativeElement.querySelector('.mf-skip-link') as HTMLAnchorElement;
    const main = fixture.nativeElement.querySelector('main') as HTMLElement;

    expect(skipLink.getAttribute('href')).toBe('#conteudo-principal');
    expect(main.id).toBe('conteudo-principal');
    expect(main.getAttribute('tabindex')).toBe('-1');
  });
});

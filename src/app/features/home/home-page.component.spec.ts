import { TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  it('communicates the MF value proposition with both primary actions', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    const actions = fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('O carro certo');
    expect(image.src).toContain('/images/felipe-hero.jpeg');
    expect(image.alt).toContain('Felipe');
    expect(fixture.nativeElement.querySelector('.mf-hero__media')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.mf-hero__actions')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#problem-title')?.textContent).toContain(
      'não deveria ser uma aposta',
    );
    expect(fixture.nativeElement.querySelectorAll('app-mf-accordion-item')).toHaveLength(7);
    expect(fixture.nativeElement.querySelectorAll('.mf-curation__steps li')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.mf-vehicle-preview')).toHaveLength(3);
    expect(fixture.nativeElement.querySelector('#finder-cta-title')?.textContent).toContain(
      'carro que você procura',
    );
    expect(
      fixture.nativeElement.querySelector('.mf-finder-cta__action')?.getAttribute('href'),
    ).toBe('https://wa.me/557998709362');
    expect(fixture.nativeElement.querySelectorAll('.mf-delivery-preview')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('#deliveries-preview-title')?.textContent).toContain(
      'continua na estrada',
    );
    expect(
      fixture.nativeElement.querySelector('.mf-delivery-preview blockquote')?.textContent,
    ).toContain('decisão ficou clara');
    expect(
      fixture.nativeElement.querySelectorAll('.mf-delivery-preview [aria-label*="star"]'),
    ).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('#about-preview-title')?.textContent).toContain(
      'não está à primeira vista',
    );
    expect(
      fixture.nativeElement
        .querySelector('#fale-com-felipe .mf-final-cta__action')
        ?.getAttribute('href'),
    ).toBe('https://wa.me/557998709362');
    expect(fixture.nativeElement.querySelector('.mf-footer')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.mf-footer__links a')).toHaveLength(3);
    expect(fixture.nativeElement.querySelector('.mf-footer__admin')).toBeFalsy();

    const firstRisk = fixture.nativeElement.querySelector(
      'app-mf-accordion-item button',
    ) as HTMLButtonElement;
    firstRisk.dispatchEvent(new KeyboardEvent('keydown', { cancelable: true, key: 'Enter' }));
    fixture.detectChanges();

    expect(firstRisk.getAttribute('aria-expanded')).toBe('true');
    expect(actions[0].getAttribute('href')).toBe('https://wa.me/557998709362');
    expect(actions[1].getAttribute('href')).toBe('/showroom');
  });
});

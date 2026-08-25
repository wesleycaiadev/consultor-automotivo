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
    expect(actions[0].getAttribute('href')).toBe('/encontrar-meu-carro');
    expect(actions[1].getAttribute('href')).toBe('/showroom');
  });
});

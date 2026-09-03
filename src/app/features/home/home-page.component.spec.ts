import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { PublicContentRepository } from '../../core/services/public-content-repository.service';
import { HomePageComponent } from './home-page.component';

const repository: VehicleRepository = {
  findPublishedBySlug: async () => undefined,
  listPublished: async () => [
    {
      id: 'vehicle-1',
      slug: 'teste',
      brand: 'Porsche',
      model: '911',
      version: 'Carrera',
      manufacturingYear: 2024,
      modelYear: 2024,
      mileage: 2500,
      price: null,
      transmission: 'Automático',
      fuel: 'Gasolina',
      category: 'other',
      color: 'Cinza',
      location: 'Aracaju — SE',
      description: 'Teste',
      status: 'published' as const,
      featured: true,
      createdAt: '2026-08-28T00:00:00.000Z',
      updatedAt: '2026-08-28T00:00:00.000Z',
      images: [],
    },
  ],
};

describe('HomePageComponent', () => {
  it('communicates the MF value proposition with both primary actions', async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: VEHICLE_REPOSITORY, useValue: repository },
        { provide: PublicContentRepository, useValue: { listPublishedDeliveries: async () => [] } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomePageComponent);
    await fixture.whenStable();
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
    expect(fixture.nativeElement.querySelectorAll('.mf-vehicle-preview')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('#finder-cta-title')?.textContent).toContain(
      'carro que você procura',
    );
    expect(
      fixture.nativeElement.querySelector('.mf-finder-cta__action')?.getAttribute('href'),
    ).toBe('/encontrar-meu-carro');
    expect(fixture.nativeElement.querySelectorAll('.mf-delivery-preview')).toHaveLength(0);
    expect(
      fixture.nativeElement.querySelector('.mf-deliveries-preview__empty')?.textContent,
    ).toContain('Ainda não há entregas publicadas');
    expect(fixture.nativeElement.querySelector('#deliveries-preview-title')?.textContent).toContain(
      'continua na estrada',
    );
    expect(fixture.nativeElement.querySelector('.mf-delivery-preview blockquote')).toBeNull();
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
    expect(fixture.nativeElement.querySelector('.mf-footer__admin')?.getAttribute('href')).toBe(
      '/admin/login',
    );

    const firstRisk = fixture.nativeElement.querySelector(
      'app-mf-accordion-item button',
    ) as HTMLButtonElement;
    firstRisk.dispatchEvent(new KeyboardEvent('keydown', { cancelable: true, key: 'Enter' }));
    fixture.detectChanges();

    expect(firstRisk.getAttribute('aria-expanded')).toBe('true');
    expect(actions[0].getAttribute('href')).toBe('https://wa.me/557998709362');
    expect(actions[1].getAttribute('href')).toBe('/showroom');
    expect(
      fixture.nativeElement
        .querySelector('.mf-footer__contact a[href*="instagram"]')
        ?.getAttribute('href'),
    ).toBe('https://www.instagram.com/marques_felipe96?igsi=bDNzYjdpcHh6amZh');
  });
});

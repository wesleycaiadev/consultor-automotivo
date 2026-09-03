import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SeoService } from './seo.service';
import { type Vehicle } from '../../shared/models/vehicle.model';

describe('SeoService', () => {
  let documentRef: Document;
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Meta, Title, provideRouter([])],
    });
    documentRef = TestBed.inject(DOCUMENT);
    documentRef
      .querySelectorAll('link[rel="canonical"], script[type="application/ld+json"]')
      .forEach((element) => element.remove());
    service = TestBed.inject(SeoService);
  });

  afterEach(() => TestBed.resetTestingModule());

  it('writes title, description, canonical and social metadata for a public page', () => {
    service.setPage({
      title: 'Showroom — Marques Felipe',
      description: 'Veículos selecionados para uma decisão segura.',
      path: '/showroom',
    });

    expect(TestBed.inject(Title).getTitle()).toBe('Showroom — Marques Felipe');
    expect(documentRef.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Veículos selecionados para uma decisão segura.',
    );
    expect(documentRef.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index,follow',
    );
    expect(documentRef.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://marquesfelipe.com.br/showroom',
    );
    expect(documentRef.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://marquesfelipe.com.br/showroom',
    );
  });

  it('marks admin pages as noindex', () => {
    service.setPage({
      title: 'Administração — Marques Felipe',
      description: 'Área administrativa restrita.',
      path: '/admin',
      noindex: true,
    });

    expect(documentRef.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex,nofollow',
    );
  });

  it('publishes the configured Instagram profile in organization data', () => {
    const structuredData = (
      service as unknown as { structuredDataFor(path: string): Record<string, unknown> | null }
    ).structuredDataFor('/');

    service.setPage(
      {
        title: 'Marques Felipe — Curadoria Automotiva',
        description: 'Curadoria automotiva.',
        path: '/',
      },
      structuredData,
    );

    const jsonLd = JSON.parse(
      documentRef.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}',
    ) as { '@graph'?: { sameAs?: string[] }[] };

    expect(jsonLd['@graph']?.[0]?.sameAs).toEqual([
      'https://www.instagram.com/marques_felipe96?igsi=bDNzYjdpcHh6amZh',
    ]);
  });

  it('writes vehicle metadata and structured data only from a loaded vehicle', () => {
    const vehicle: Vehicle = {
      id: 'vehicle-1',
      slug: 'porsche-911-carrera-2023',
      brand: 'Porsche',
      model: '911 Carrera',
      version: 'PDK',
      manufacturingYear: 2023,
      modelYear: 2023,
      mileage: 3000,
      price: null,
      transmission: 'Automático',
      fuel: 'Gasolina',
      category: 'other',
      color: 'Cinza Ágata',
      location: 'Aracaju — SE',
      description: 'Veículo selecionado para a curadoria.',
      status: 'published',
      featured: true,
      createdAt: '2026-08-01T12:00:00.000Z',
      updatedAt: '2026-08-20T12:00:00.000Z',
      images: [],
    };

    service.setVehicle(vehicle, 'https://example.com/porsche.jpg');
    const jsonLd = JSON.parse(
      documentRef.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}',
    ) as Record<string, unknown>;

    expect(TestBed.inject(Title).getTitle()).toContain('Porsche 911 Carrera PDK');
    expect(documentRef.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://marquesfelipe.com.br/showroom/porsche-911-carrera-2023',
    );
    expect(jsonLd['@type']).toBe('Vehicle');
    expect(jsonLd['name']).toBe('Porsche 911 Carrera PDK');
  });
});

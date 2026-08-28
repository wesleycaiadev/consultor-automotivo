import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { type Vehicle } from '../../shared/models/vehicle.model';
import { VehicleDetailPageComponent } from './vehicle-detail-page.component';

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
  description: 'Descrição de teste.',
  status: 'published',
  featured: true,
  createdAt: '2026-08-01T12:00:00.000Z',
  updatedAt: '2026-08-20T12:00:00.000Z',
  images: [
    {
      id: 'image-1',
      vehicleId: 'vehicle-1',
      storagePath: 'vehicles/vehicle-1/cover.jpg',
      altText: 'Porsche 911 Carrera cinza',
      sortOrder: 0,
      isCover: true,
    },
  ],
};

const repository: VehicleRepository = {
  findPublishedBySlug: async () => vehicle,
  listPublished: async () => [vehicle],
};

describe('VehicleDetailPageComponent', () => {
  it('loads the requested vehicle and provides its gallery', async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: VEHICLE_REPOSITORY, useValue: repository },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ slug: vehicle.slug }) } },
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(VehicleDetailPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Porsche 911 Carrera');
    expect(fixture.nativeElement.querySelector('app-vehicle-gallery')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.mf-vehicle-detail__price')?.textContent).toContain(
      'Consulte',
    );
    expect(fixture.nativeElement.querySelector('.mf-vehicle-detail__specs')?.textContent).toContain(
      '3.000 km',
    );
    expect(fixture.nativeElement.querySelector('#vehicle-equipment-title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#vehicle-observations-title')).toBeTruthy();
    expect(fixture.componentInstance.formatPrice(1450000)).toContain('1.450.000');
    expect(
      fixture.nativeElement.querySelector('.mf-vehicle-detail__interest a')?.getAttribute('href'),
    ).toContain('https://wa.me/557998709362?text=');
    expect(
      fixture.nativeElement.querySelector('.mf-vehicle-detail__back')?.getAttribute('href'),
    ).toBe('/showroom');
  });
});

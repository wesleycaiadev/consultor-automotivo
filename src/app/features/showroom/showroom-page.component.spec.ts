import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  type VehicleRepository,
  VEHICLE_REPOSITORY,
} from '../../core/services/vehicle-repository.service';
import { type Vehicle } from '../../shared/models/vehicle.model';
import { ShowroomPageComponent } from './showroom-page.component';

const vehicles: readonly Vehicle[] = [
  {
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
  },
  {
    id: 'vehicle-2',
    slug: 'range-rover-autobiography-2022',
    brand: 'Land Rover',
    model: 'Range Rover Autobiography',
    version: 'P530',
    manufacturingYear: 2022,
    modelYear: 2022,
    mileage: 18500,
    price: 1450000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    category: 'suv',
    color: 'Branco Fuji',
    location: 'Maceió — AL',
    description: 'Descrição de teste.',
    status: 'published',
    featured: true,
    createdAt: '2026-08-03T12:00:00.000Z',
    updatedAt: '2026-08-21T12:00:00.000Z',
    images: [
      {
        id: 'image-2',
        vehicleId: 'vehicle-2',
        storagePath: 'vehicles/vehicle-2/cover.jpg',
        altText: 'Range Rover Autobiography branco',
        sortOrder: 0,
        isCover: true,
      },
    ],
  },
];

const repository: VehicleRepository = {
  findPublishedBySlug: async (slug) => vehicles.find((vehicle) => vehicle.slug === slug),
  listPublished: async () => vehicles,
};

describe('ShowroomPageComponent', () => {
  it('loads vehicles, filters the collection and shows the Finder interruption', async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: VEHICLE_REPOSITORY, useValue: repository }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ShowroomPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-mf-vehicle-card')).toHaveLength(2);
    expect(
      fixture.nativeElement.querySelector('.mf-showroom-page__finder a')?.getAttribute('href'),
    ).toBe('/encontrar-meu-carro');

    fixture.componentInstance.filters.select('suv');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-mf-vehicle-card')).toHaveLength(1);

    fixture.componentInstance.filters.select('hatch');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nenhum veículo corresponde a este filtro');
  });
});

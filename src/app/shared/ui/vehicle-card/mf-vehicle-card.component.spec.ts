import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { type Vehicle } from '../../models/vehicle.model';
import { MfVehicleCardComponent } from './mf-vehicle-card.component';

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
  steering: 'Elétrica',
  color: 'Cinza Ágata',
  location: 'Aracaju — SE',
  description: 'Descrição de teste.',
  equipment: [],
  fipeCode: null,
  fipePrice: null,
  fipeReferenceMonth: null,
  status: 'published',
  featured: true,
  createdAt: '2026-08-01T12:00:00.000Z',
  updatedAt: '2026-08-20T12:00:00.000Z',
  images: [],
};

describe('MfVehicleCardComponent', () => {
  it('presents an accessible vehicle summary and optional technical metadata', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(MfVehicleCardComponent);
    fixture.componentRef.setInput('vehicle', vehicle);
    fixture.componentRef.setInput('imageAlt', 'Porsche 911 Carrera cinza em ambiente interno');
    fixture.componentRef.setInput(
      'imageUrl',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    );
    fixture.componentRef.setInput('showTechnicalMetadata', true);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.mf-vehicle-card__link') as HTMLAnchorElement;
    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(link.getAttribute('href')).toBe('/showroom/porsche-911-carrera-2023');
    expect(image.alt).toContain('Porsche 911 Carrera');
    expect(fixture.nativeElement.querySelector('h3')?.textContent).toContain('Porsche 911 Carrera');
    expect(fixture.nativeElement.querySelector('.mf-vehicle-card__summary')?.textContent).toContain(
      '3.000 km',
    );
    expect(fixture.nativeElement.querySelector('.mf-vehicle-card__summary')?.textContent).toContain(
      'Consulte',
    );
    expect(
      fixture.nativeElement.querySelector('.mf-vehicle-card__technical')?.textContent,
    ).toContain('Automático');

    link.focus();
    expect(document.activeElement).toBe(link);
  });
});

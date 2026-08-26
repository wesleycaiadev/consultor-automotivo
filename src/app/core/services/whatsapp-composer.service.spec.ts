import { type Vehicle } from '../../shared/models/vehicle.model';
import { WhatsappComposerService } from './whatsapp-composer.service';

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
  color: 'Cinza Ágata',
  location: 'Aracaju — SE',
  description: 'Descrição de teste.',
  status: 'published',
  featured: true,
  createdAt: '2026-08-01T12:00:00.000Z',
  updatedAt: '2026-08-20T12:00:00.000Z',
  images: [],
};

describe('WhatsappComposerService', () => {
  it('creates an encoded vehicle interest message', () => {
    const url = new URL(new WhatsappComposerService().vehicleInterest(vehicle));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/557998709362');
    expect(url.searchParams.get('text')).toContain('Porsche 911 Carrera PDK');
    expect(url.searchParams.get('text')).toContain('2023 · 3.000 km');
  });
});

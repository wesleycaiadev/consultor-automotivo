import { type Vehicle } from '../../shared/models/vehicle.model';
import { type FinderWhatsappInput, WhatsappComposerService } from './whatsapp-composer.service';

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
  images: [],
};

const finderInput: FinderWhatsappInput = {
  brand: 'Porsche',
  budget: 'De R$ 150 mil a R$ 250 mil',
  category: 'SUV',
  condition: 'Seminovo',
  model: 'Macan',
  notes: 'Uso familiar e viagens longas.',
  powertrain: 'Equilibrada (1.4 a 2.0)',
  usage: 'Família',
};

describe('WhatsappComposerService', () => {
  it('creates an encoded vehicle interest message', () => {
    const url = new URL(new WhatsappComposerService().vehicleInterest(vehicle));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/557998709362');
    expect(url.searchParams.get('text')).toContain('Porsche 911 Carrera PDK');
    expect(url.searchParams.get('text')).toContain('2023 · 3.000 km');
  });

  it('creates an encoded Finder message in Portuguese with filled optional preferences', () => {
    const url = new URL(new WhatsappComposerService().finderSearch(finderInput));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/557998709362');
    expect(url.searchParams.get('text')).toBe(
      [
        'Olá, Felipe! Gostaria da sua ajuda para encontrar um veículo.',
        '',
        'Tipo de veículo: SUV',
        'Faixa de investimento: De R$ 150 mil a R$ 250 mil',
        'Condição: Seminovo',
        'Marca: Porsche',
        'Modelo: Macan',
        'Uso principal: Família',
        'Motorização: Equilibrada (1.4 a 2.0)',
        'Observações: Uso familiar e viagens longas.',
        '',
        'Podemos conversar?',
      ].join('\n'),
    );
  });

  it('omits empty Finder optional preferences from the message', () => {
    const url = new URL(
      new WhatsappComposerService().finderSearch({
        ...finderInput,
        brand: ' ',
        model: '',
        notes: '   ',
        powertrain: ' ',
        usage: '',
      }),
    );

    expect(url.searchParams.get('text')).toBe(
      [
        'Olá, Felipe! Gostaria da sua ajuda para encontrar um veículo.',
        '',
        'Tipo de veículo: SUV',
        'Faixa de investimento: De R$ 150 mil a R$ 250 mil',
        'Condição: Seminovo',
        '',
        'Podemos conversar?',
      ].join('\n'),
    );
  });
});

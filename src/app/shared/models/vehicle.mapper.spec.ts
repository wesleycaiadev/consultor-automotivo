import { describe, expect, it } from 'vitest';
import { mapVehicleRecord } from './vehicle.mapper';
import { type VehicleRecord } from './vehicle.model';

describe('mapVehicleRecord', () => {
  it('maps persistence fields to the UI domain without leaking snake_case', () => {
    const record: VehicleRecord = {
      id: 'vehicle-1',
      slug: 'porsche-911-carrera-2023',
      brand: 'Porsche',
      model: '911 Carrera',
      version: 'PDK',
      manufacturing_year: 2023,
      model_year: 2024,
      mileage: 3500,
      price: null,
      transmission: 'Automático',
      fuel: 'Gasolina',
      category: 'other',
      steering: 'Elétrica',
      color: 'Cinza Ágata',
      location: 'Aracaju — SE',
      description: 'Descrição de teste.',
      equipment: ['Ar-condicionado', ' '],
      fipe_code: '001234-5',
      fipe_price: 1450000,
      fipe_reference_month: 'agosto de 2026',
      status: 'published',
      featured: true,
      created_at: '2026-08-01T12:00:00.000Z',
      updated_at: '2026-08-20T12:00:00.000Z',
      images: [
        {
          id: 'image-1',
          vehicle_id: 'vehicle-1',
          storage_path: 'vehicles/vehicle-1/cover.jpg',
          alt_text: 'Porsche 911 Carrera',
          sort_order: 0,
          is_cover: true,
        },
      ],
    };

    const vehicle = mapVehicleRecord(record);

    expect(vehicle).toMatchObject({
      manufacturingYear: 2023,
      modelYear: 2024,
      category: 'other',
      steering: 'Elétrica',
      equipment: ['Ar-condicionado'],
      fipeCode: '001234-5',
      fipePrice: 1450000,
      fipeReferenceMonth: 'agosto de 2026',
      createdAt: '2026-08-01T12:00:00.000Z',
      images: [
        {
          vehicleId: 'vehicle-1',
          storagePath: 'vehicles/vehicle-1/cover.jpg',
          altText: 'Porsche 911 Carrera',
        },
      ],
    });
    expect('manufacturing_year' in vehicle).toBe(false);
  });

  it('keeps pre-migration records filterable while category is being deployed', () => {
    const vehicle = mapVehicleRecord({
      id: 'vehicle-siena',
      slug: 'fiat-siena-2010',
      brand: 'Fiat',
      model: 'Siena EL',
      version: '1.0 Fire Flex',
      manufacturing_year: 2010,
      model_year: 2010,
      mileage: 211000,
      price: 26000,
      transmission: 'Manual',
      fuel: 'Flex',
      color: 'Prata',
      location: 'Aracaju — SE',
      description: 'Registro criado antes da categoria.',
      status: 'published',
      featured: false,
      created_at: '2026-08-01T12:00:00.000Z',
      updated_at: '2026-08-20T12:00:00.000Z',
      images: [],
    });

    expect(vehicle.category).toBe('sedan');
  });
});

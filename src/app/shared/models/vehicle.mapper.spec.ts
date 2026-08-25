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
      color: 'Cinza Ágata',
      location: 'Aracaju — SE',
      description: 'Descrição de teste.',
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
});

import { Injectable, InjectionToken } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mapVehicleRecord } from '../../shared/models/vehicle.mapper';
import {
  type Vehicle,
  type VehicleImageRecord,
  type VehicleRecord,
} from '../../shared/models/vehicle.model';

export interface VehicleRepository {
  listPublished(): Promise<readonly Vehicle[]>;
  findPublishedBySlug(slug: string): Promise<Vehicle | undefined>;
}

export const VEHICLE_REPOSITORY = new InjectionToken<VehicleRepository>('VEHICLE_REPOSITORY');

@Injectable({ providedIn: 'root' })
export class MockVehicleRepository implements VehicleRepository {
  readonly #vehicles = MOCK_VEHICLE_RECORDS.map(mapVehicleRecord);

  async listPublished(): Promise<readonly Vehicle[]> {
    return this.#vehicles.filter((vehicle) => vehicle.status === 'published');
  }

  async findPublishedBySlug(slug: string): Promise<Vehicle | undefined> {
    return (await this.listPublished()).find((vehicle) => vehicle.slug === slug);
  }
}

type SupabaseVehicleRecord = Omit<VehicleRecord, 'images'> & {
  readonly vehicle_images: readonly VehicleImageRecord[] | null;
};

const supabaseUrl = 'https://urjcjtwveunzixxkdikf.supabase.co';
const supabasePublishableKey = 'sb_publishable_cpqdy12viM8aHIrkRqAuww_PL4nH8yx';

/** Public catalogue: only rows allowed by the published-only RLS policies are requested. */
@Injectable({ providedIn: 'root' })
export class SupabaseVehicleRepository implements VehicleRepository {
  readonly #client: SupabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });

  async listPublished(): Promise<readonly Vehicle[]> {
    const { data, error } = await this.#client
      .from('vehicles')
      .select('*, vehicle_images(*)')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Promise.all(
      ((data ?? []) as unknown as readonly SupabaseVehicleRecord[]).map((record) =>
        this.mapPublicRecord(record),
      ),
    );
  }

  async findPublishedBySlug(slug: string): Promise<Vehicle | undefined> {
    return (await this.listPublished()).find((vehicle) => vehicle.slug === slug);
  }

  private async mapPublicRecord(record: SupabaseVehicleRecord): Promise<Vehicle> {
    const images = await Promise.all(
      [...(record.vehicle_images ?? [])]
        .sort((first, second) => first.sort_order - second.sort_order)
        .map(async (image) => {
          const { data, error } = await this.#client.storage
            .from('vehicles')
            .createSignedUrl(image.storage_path, 60 * 60);

          if (error) throw error;

          return { ...image, signed_url: data.signedUrl };
        }),
    );

    return mapVehicleRecord({ ...record, images });
  }
}

const MOCK_VEHICLE_RECORDS: readonly VehicleRecord[] = [
  {
    id: 'e4af04e9-3b79-4f27-b0c7-a6e57e62f9c4',
    slug: 'porsche-911-carrera-2023',
    brand: 'Porsche',
    model: '911 Carrera',
    version: 'PDK',
    manufacturing_year: 2023,
    model_year: 2023,
    mileage: 3000,
    price: null,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Cinza Ágata',
    location: 'Aracaju — SE',
    description: 'Veículo selecionado para a curadoria de Marques Felipe.',
    status: 'published',
    featured: true,
    created_at: '2026-08-01T12:00:00.000Z',
    updated_at: '2026-08-20T12:00:00.000Z',
    images: [
      {
        id: '5f774e58-a44e-4a96-bd7f-c1598bf36db8',
        vehicle_id: 'e4af04e9-3b79-4f27-b0c7-a6e57e62f9c4',
        storage_path: 'vehicles/porsche-911-carrera-2023/cover.jpg',
        alt_text: 'Porsche 911 Carrera cinza em ambiente interno',
        sort_order: 0,
        is_cover: true,
      },
    ],
  },
  {
    id: '4a4273bd-0902-4e4a-af00-19d2c33f3551',
    slug: 'range-rover-autobiography-2022',
    brand: 'Land Rover',
    model: 'Range Rover Autobiography',
    version: 'P530',
    manufacturing_year: 2022,
    model_year: 2022,
    mileage: 18500,
    price: 1450000,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Branco Fuji',
    location: 'Maceió — AL',
    description: 'SUV de alta especificação disponível para avaliação.',
    status: 'published',
    featured: true,
    created_at: '2026-08-03T12:00:00.000Z',
    updated_at: '2026-08-21T12:00:00.000Z',
    images: [
      {
        id: '8cf269e6-41e3-4260-a019-1c7e56bf1fb4',
        vehicle_id: '4a4273bd-0902-4e4a-af00-19d2c33f3551',
        storage_path: 'vehicles/range-rover-autobiography-2022/cover.jpg',
        alt_text: 'Range Rover Autobiography branco',
        sort_order: 0,
        is_cover: true,
      },
    ],
  },
  {
    id: 'df2d9680-8f81-4cc9-a25e-b1d32b0e14ea',
    slug: 'bmw-m3-competition-2023',
    brand: 'BMW',
    model: 'M3 Competition',
    version: 'M xDrive',
    manufacturing_year: 2023,
    model_year: 2023,
    mileage: 12000,
    price: null,
    transmission: 'Automático',
    fuel: 'Gasolina',
    color: 'Alpine White',
    location: 'Aracaju — SE',
    description: 'Sedã esportivo em fase de preparação para publicação.',
    status: 'draft',
    featured: false,
    created_at: '2026-08-05T12:00:00.000Z',
    updated_at: '2026-08-19T12:00:00.000Z',
    images: [],
  },
];

export const VEHICLE_STATUSES = ['draft', 'published', 'sold'] as const;
export const VEHICLE_CATEGORIES = ['suv', 'sedan', 'hatch', 'pickup', 'other'] as const;

export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
export type VehicleCategory = (typeof VEHICLE_CATEGORIES)[number];

export interface VehicleImage {
  readonly id: string;
  readonly vehicleId: string;
  readonly storagePath: string;
  readonly altText: string;
  readonly sortOrder: number;
  readonly isCover: boolean;
  readonly signedUrl?: string;
}

export interface Vehicle {
  readonly id: string;
  readonly slug: string;
  readonly brand: string;
  readonly model: string;
  readonly version: string;
  readonly manufacturingYear: number;
  readonly modelYear: number;
  readonly mileage: number;
  readonly price: number | null;
  readonly transmission: string;
  readonly fuel: string;
  readonly category: VehicleCategory;
  readonly steering: string | null;
  readonly color: string;
  readonly location: string;
  readonly description: string;
  readonly equipment: readonly string[];
  readonly fipeCode: string | null;
  readonly fipePrice: number | null;
  readonly fipeReferenceMonth: string | null;
  readonly status: VehicleStatus;
  readonly featured: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly images: readonly VehicleImage[];
}

export interface VehicleImageRecord {
  readonly id: string;
  readonly vehicle_id: string;
  readonly storage_path: string;
  readonly alt_text: string;
  readonly sort_order: number;
  readonly is_cover: boolean;
  readonly signed_url?: string;
}

export interface VehicleRecord {
  readonly id: string;
  readonly slug: string;
  readonly brand: string;
  readonly model: string;
  readonly version: string;
  readonly manufacturing_year: number;
  readonly model_year: number;
  readonly mileage: number;
  readonly price: number | null;
  readonly transmission: string;
  readonly fuel: string;
  readonly category?: VehicleCategory;
  readonly steering?: string | null;
  readonly color: string;
  readonly location: string;
  readonly description: string;
  readonly equipment?: readonly string[] | null;
  readonly fipe_code?: string | null;
  readonly fipe_price?: number | null;
  readonly fipe_reference_month?: string | null;
  readonly status: VehicleStatus;
  readonly featured: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly images: readonly VehicleImageRecord[];
}

import {
  type Vehicle,
  type VehicleCategory,
  type VehicleImage,
  type VehicleImageRecord,
  type VehicleRecord,
} from './vehicle.model';

export function mapVehicleImageRecord(record: VehicleImageRecord): VehicleImage {
  return {
    id: record.id,
    vehicleId: record.vehicle_id,
    storagePath: record.storage_path,
    altText: record.alt_text,
    sortOrder: record.sort_order,
    isCover: record.is_cover,
    signedUrl: record.signed_url,
  };
}

export function mapVehicleRecord(record: VehicleRecord): Vehicle {
  return {
    id: record.id,
    slug: record.slug,
    brand: record.brand,
    model: record.model,
    version: record.version,
    manufacturingYear: record.manufacturing_year,
    modelYear: record.model_year,
    mileage: record.mileage,
    price: record.price,
    transmission: record.transmission,
    fuel: record.fuel,
    category: record.category ?? legacyCategory(record),
    steering: record.steering?.trim() || null,
    color: record.color,
    location: record.location,
    description: record.description,
    equipment: (record.equipment ?? []).filter((item) => item.trim().length > 0),
    fipeCode: record.fipe_code ?? null,
    fipePrice: record.fipe_price ?? null,
    fipeReferenceMonth: record.fipe_reference_month ?? null,
    status: record.status,
    featured: record.featured,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    images: record.images.map(mapVehicleImageRecord),
  };
}

/**
 * Compatibility only for rows created before the category migration is applied.
 * New and migrated records always carry their own persisted category.
 */
function legacyCategory(record: VehicleRecord): VehicleCategory {
  const identity = `${record.brand} ${record.model} ${record.version}`.toLocaleLowerCase('pt-BR');

  if (identity.includes('range rover')) return 'suv';
  if (identity.includes('siena')) return 'sedan';
  return 'other';
}

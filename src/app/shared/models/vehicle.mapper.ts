import {
  type Vehicle,
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
    color: record.color,
    location: record.location,
    description: record.description,
    status: record.status,
    featured: record.featured,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    images: record.images.map(mapVehicleImageRecord),
  };
}

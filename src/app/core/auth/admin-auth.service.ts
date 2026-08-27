import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';

export interface AdminVehicleListItem {
  readonly id: string;
  readonly brand: string;
  readonly model: string;
  readonly version: string;
  readonly manufacturing_year: number;
  readonly model_year: number;
  readonly mileage: number;
  readonly price: number | null;
  readonly status: 'draft' | 'published' | 'sold';
  readonly featured: boolean;
  readonly updated_at: string;
}
export interface AdminVehicleImage {
  readonly id: string;
  readonly storagePath: string;
  readonly isCover: boolean;
  readonly sortOrder: number;
  readonly signedUrl: string | null;
}
export interface AdminDeliveryListItem {
  readonly id: string;
  readonly customer_name: string;
  readonly vehicle_id: string | null;
  readonly vehicle_name: string;
  readonly city: string;
  readonly testimonial: string;
  readonly delivery_date: string;
  readonly status: 'draft' | 'published';
}
export interface AdminDeliveryImage {
  readonly id: string;
  readonly storagePath: string;
  readonly isCover: boolean;
  readonly sortOrder: number;
  readonly signedUrl: string | null;
}
export interface DeliveryDraft {
  customer_name: string;
  vehicle_id: string | null;
  vehicle_name: string;
  city: string;
  testimonial: string;
  delivery_date: string;
  status: 'draft' | 'published';
}
export interface VehicleQuickUpdate {
  readonly mileage: number;
  readonly price: number | null;
  readonly status: 'draft' | 'published' | 'sold';
  readonly featured: boolean;
}
export interface VehicleDraft {
  slug: string;
  brand: string;
  model: string;
  version: string;
  manufacturing_year: number;
  model_year: number;
  mileage: number;
  price: number | null;
  transmission: string;
  fuel: string;
  steering: string;
  color: string;
  location: string;
  description: string;
  equipment: string[];
  status: 'draft' | 'published' | 'sold';
  featured: boolean;
  fipe_code: string | null;
  fipe_price: number | null;
  fipe_reference_month: string | null;
  fipe_last_sync: string | null;
}
export interface CatalogBrand {
  readonly id: string;
  readonly name: string;
  readonly fipeCode: string;
}
export interface CatalogModel {
  readonly id: string;
  readonly name: string;
  readonly fipeModelCode: string;
}
export interface CatalogFipeYear {
  readonly code: string;
  readonly name: string;
  readonly modelYear: number;
}
export interface FipeReference {
  readonly code: string;
  readonly price: number;
  readonly referenceMonth: string;
  readonly fuel: string;
  readonly modelYear: number;
}

const supabaseUrl = 'https://urjcjtwveunzixxkdikf.supabase.co';
const supabasePublishableKey = 'sb_publishable_cpqdy12viM8aHIrkRqAuww_PL4nH8yx';
const fipeBaseUrl = 'https://fipe.parallelum.com.br/api/v2/cars';
const acceptedVehicleImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxVehicleImageSize = 10 * 1024 * 1024;
const maxVehicleImageCount = 15;
const acceptedDeliveryImageTypes = acceptedVehicleImageTypes;
const maxDeliveryImageSize = maxVehicleImageSize;
const maxDeliveryImageCount = 8;

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #client: SupabaseClient | null;

  readonly session = signal<Session | null>(null);
  readonly error = signal<string | null>(null);
  readonly isAuthenticated = computed(() => this.session() !== null);

  constructor() {
    if (!isPlatformBrowser(this.#platformId)) {
      this.#client = null;
      return;
    }

    this.#client = createClient(supabaseUrl, supabasePublishableKey, {
      auth: { autoRefreshToken: true, persistSession: true },
    });
    void this.restoreSession();
    this.#client.auth.onAuthStateChange((_event, session) => this.session.set(session));
  }

  async signIn(email: string, password: string): Promise<boolean> {
    if (!this.#client) return false;
    this.error.set(null);
    const { error } = await this.#client.auth.signInWithPassword({ email, password });
    if (error) {
      this.error.set('Não foi possível entrar. Confira seus dados e tente novamente.');
      return false;
    }
    return true;
  }

  async signOut(): Promise<void> {
    if (!this.#client) return;
    const { error } = await this.#client.auth.signOut();
    if (error) this.error.set('Não foi possível encerrar a sessão. Tente novamente.');
  }

  async restoreSession(): Promise<void> {
    if (!this.#client) return;
    const { data, error } = await this.#client.auth.getSession();
    if (error) {
      this.error.set('Não foi possível restaurar sua sessão.');
      return;
    }
    this.session.set(data.session);
  }

  async listVehicles(): Promise<readonly AdminVehicleListItem[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('vehicles')
      .select(
        'id,brand,model,version,manufacturing_year,model_year,mileage,price,status,featured,updated_at',
      )
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as readonly AdminVehicleListItem[];
  }

  async updateVehicleQuick(
    vehicleId: string,
    update: VehicleQuickUpdate,
  ): Promise<AdminVehicleListItem> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('vehicles')
      .update(update)
      .eq('id', vehicleId)
      .select(
        'id,brand,model,version,manufacturing_year,model_year,mileage,price,status,featured,updated_at',
      )
      .single();
    if (error) throw error;
    return data as AdminVehicleListItem;
  }

  async listVehicleImages(vehicleId: string): Promise<readonly AdminVehicleImage[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('vehicle_images')
      .select('id,storage_path,is_cover,sort_order')
      .eq('vehicle_id', vehicleId)
      .order('sort_order');
    if (error) throw error;
    return Promise.all(
      (data ?? []).map(async (image) => {
        const { data: signed, error: signedError } = await this.#client!.storage.from(
          'vehicles',
        ).createSignedUrl(image.storage_path as string, 60 * 10);
        return {
          id: image.id as string,
          storagePath: image.storage_path as string,
          isCover: image.is_cover as boolean,
          sortOrder: image.sort_order as number,
          signedUrl: signedError ? null : (signed?.signedUrl ?? null),
        };
      }),
    );
  }

  async setVehicleCover(vehicleId: string, imageId: string): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { error: clearError } = await this.#client
      .from('vehicle_images')
      .update({ is_cover: false })
      .eq('vehicle_id', vehicleId);
    if (clearError) throw clearError;

    const { error: coverError } = await this.#client
      .from('vehicle_images')
      .update({ is_cover: true })
      .eq('id', imageId)
      .eq('vehicle_id', vehicleId);
    if (coverError) throw coverError;
  }

  async uploadVehicleImages(
    vehicleId: string,
    brand: string,
    model: string,
    photos: readonly File[],
    onProgress?: (completed: number, total: number) => void,
  ): Promise<readonly AdminVehicleImage[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    this.assertVehicleImages(photos);
    const existing = await this.listVehicleImages(vehicleId);
    if (existing.length + photos.length > maxVehicleImageCount)
      throw new Error('O limite é de 15 fotos por veículo.');

    const uploadedPaths: string[] = [];
    const insertedIds: string[] = [];
    try {
      for (const [index, photo] of photos.entries()) {
        const storagePath = this.buildVehicleImagePath(vehicleId, index, photo);
        const { error: uploadError } = await this.#client.storage
          .from('vehicles')
          .upload(storagePath, photo, { contentType: photo.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);

        const { data: image, error: imageError } = await this.#client
          .from('vehicle_images')
          .insert({
            vehicle_id: vehicleId,
            storage_path: storagePath,
            alt_text: `${brand} ${model} — foto ${existing.length + index + 1}`,
            sort_order: existing.length + index,
            is_cover: existing.length === 0 && index === 0,
          })
          .select('id')
          .single();
        if (imageError) throw imageError;
        insertedIds.push(image.id as string);
        onProgress?.(index + 1, photos.length);
      }
    } catch (error) {
      if (insertedIds.length)
        await this.#client.from('vehicle_images').delete().in('id', insertedIds);
      if (uploadedPaths.length) await this.#client.storage.from('vehicles').remove(uploadedPaths);
      throw error;
    }
    return this.listVehicleImages(vehicleId);
  }

  async removeVehicleImage(vehicleId: string, image: AdminVehicleImage): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const remaining = (await this.listVehicleImages(vehicleId)).filter(
      (current) => current.id !== image.id,
    );
    if (image.isCover && remaining.length) await this.setVehicleCover(vehicleId, remaining[0].id);

    const { error: deleteError } = await this.#client
      .from('vehicle_images')
      .delete()
      .eq('id', image.id)
      .eq('vehicle_id', vehicleId);
    if (deleteError) throw deleteError;
    const { error: storageError } = await this.#client.storage
      .from('vehicles')
      .remove([image.storagePath]);
    if (storageError) throw storageError;
    await this.reorderVehicleImages(
      vehicleId,
      remaining.map((current) => current.id),
    );
  }

  async reorderVehicleImages(vehicleId: string, imageIds: readonly string[]): Promise<void> {
    if (!this.#client || !imageIds.length) return;
    for (const [index, imageId] of imageIds.entries()) {
      const { error } = await this.#client
        .from('vehicle_images')
        .update({ sort_order: 1000 + index })
        .eq('id', imageId)
        .eq('vehicle_id', vehicleId);
      if (error) throw error;
    }
    for (const [index, imageId] of imageIds.entries()) {
      const { error } = await this.#client
        .from('vehicle_images')
        .update({ sort_order: index })
        .eq('id', imageId)
        .eq('vehicle_id', vehicleId);
      if (error) throw error;
    }
  }

  async createVehicle(
    draft: VehicleDraft,
    photos: readonly File[] = [],
    onPhotoUploaded?: (completed: number, total: number) => void,
  ): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    this.assertVehicleImages(photos);
    if (photos.length > maxVehicleImageCount)
      throw new Error('O limite é de 15 fotos por veículo.');
    const { data, error } = await this.#client.from('vehicles').insert(draft).select('id').single();
    if (error) throw error;

    const uploadedPaths: string[] = [];
    try {
      for (const [index, photo] of photos.entries()) {
        const storagePath = this.buildVehicleImagePath(data.id as string, index, photo);
        const { error: uploadError } = await this.#client.storage
          .from('vehicles')
          .upload(storagePath, photo, { contentType: photo.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);

        const { error: imageError } = await this.#client.from('vehicle_images').insert({
          vehicle_id: data.id,
          storage_path: storagePath,
          alt_text: `${draft.brand} ${draft.model} — foto ${index + 1}`,
          sort_order: index,
          is_cover: index === 0,
        });
        if (imageError) throw imageError;
        onPhotoUploaded?.(index + 1, photos.length);
      }
    } catch (mediaError) {
      if (uploadedPaths.length) await this.#client.storage.from('vehicles').remove(uploadedPaths);
      await this.#client.from('vehicles').delete().eq('id', data.id);
      throw mediaError;
    }
  }

  async listDeliveries(): Promise<readonly AdminDeliveryListItem[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('deliveries')
      .select('id,customer_name,vehicle_id,vehicle_name,city,testimonial,delivery_date,status')
      .order('delivery_date', { ascending: false });
    if (error) throw error;
    return (data ?? []) as readonly AdminDeliveryListItem[];
  }

  async createDelivery(
    draft: DeliveryDraft,
    photos: readonly File[] = [],
    onPhotoUploaded?: (completed: number, total: number) => void,
  ): Promise<AdminDeliveryListItem> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    this.assertDeliveryImages(photos);
    if (photos.length > maxDeliveryImageCount)
      throw new Error('O limite é de 8 fotos por entrega.');

    const { data, error } = await this.#client
      .from('deliveries')
      .insert(draft)
      .select('id,customer_name,vehicle_id,vehicle_name,city,testimonial,delivery_date,status')
      .single();
    if (error) throw error;

    const uploadedPaths: string[] = [];
    try {
      for (const [index, photo] of photos.entries()) {
        const storagePath = this.buildDeliveryImagePath(data.id as string, index, photo);
        const { error: uploadError } = await this.#client.storage
          .from('deliveries')
          .upload(storagePath, photo, { contentType: photo.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);

        const { error: imageError } = await this.#client.from('delivery_images').insert({
          delivery_id: data.id,
          storage_path: storagePath,
          sort_order: index,
          is_cover: index === 0,
        });
        if (imageError) throw imageError;
        onPhotoUploaded?.(index + 1, photos.length);
      }
    } catch (mediaError) {
      if (uploadedPaths.length) await this.#client.storage.from('deliveries').remove(uploadedPaths);
      await this.#client.from('deliveries').delete().eq('id', data.id);
      throw mediaError;
    }

    return data as AdminDeliveryListItem;
  }

  async updateDelivery(deliveryId: string, draft: DeliveryDraft): Promise<AdminDeliveryListItem> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('deliveries')
      .update(draft)
      .eq('id', deliveryId)
      .select('id,customer_name,vehicle_id,vehicle_name,city,testimonial,delivery_date,status')
      .single();
    if (error) throw error;
    return data as AdminDeliveryListItem;
  }

  async deleteDelivery(deliveryId: string): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const images = await this.listDeliveryImages(deliveryId);
    const { error } = await this.#client.from('deliveries').delete().eq('id', deliveryId);
    if (error) throw error;
    const paths = images.map((image) => image.storagePath);
    if (paths.length) await this.#client.storage.from('deliveries').remove(paths);
  }

  async listDeliveryImages(deliveryId: string): Promise<readonly AdminDeliveryImage[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('delivery_images')
      .select('id,storage_path,is_cover,sort_order')
      .eq('delivery_id', deliveryId)
      .order('sort_order');
    if (error) throw error;
    return Promise.all(
      (data ?? []).map(async (image) => {
        const { data: signed, error: signedError } = await this.#client!.storage.from(
          'deliveries',
        ).createSignedUrl(image.storage_path as string, 60 * 10);
        return {
          id: image.id as string,
          storagePath: image.storage_path as string,
          isCover: image.is_cover as boolean,
          sortOrder: image.sort_order as number,
          signedUrl: signedError ? null : (signed?.signedUrl ?? null),
        };
      }),
    );
  }

  async setDeliveryCover(deliveryId: string, imageId: string): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { error: clearError } = await this.#client
      .from('delivery_images')
      .update({ is_cover: false })
      .eq('delivery_id', deliveryId);
    if (clearError) throw clearError;

    const { error: coverError } = await this.#client
      .from('delivery_images')
      .update({ is_cover: true })
      .eq('id', imageId)
      .eq('delivery_id', deliveryId);
    if (coverError) throw coverError;
  }

  async uploadDeliveryImages(
    deliveryId: string,
    photos: readonly File[],
    onProgress?: (completed: number, total: number) => void,
  ): Promise<readonly AdminDeliveryImage[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    this.assertDeliveryImages(photos);
    const existing = await this.listDeliveryImages(deliveryId);
    if (existing.length + photos.length > maxDeliveryImageCount)
      throw new Error('O limite é de 8 fotos por entrega.');

    const uploadedPaths: string[] = [];
    const insertedIds: string[] = [];
    try {
      for (const [index, photo] of photos.entries()) {
        const storagePath = this.buildDeliveryImagePath(deliveryId, index, photo);
        const { error: uploadError } = await this.#client.storage
          .from('deliveries')
          .upload(storagePath, photo, { contentType: photo.type, upsert: false });
        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);

        const { data: image, error: imageError } = await this.#client
          .from('delivery_images')
          .insert({
            delivery_id: deliveryId,
            storage_path: storagePath,
            sort_order: existing.length + index,
            is_cover: existing.length === 0 && index === 0,
          })
          .select('id')
          .single();
        if (imageError) throw imageError;
        insertedIds.push(image.id as string);
        onProgress?.(index + 1, photos.length);
      }
    } catch (error) {
      if (insertedIds.length)
        await this.#client.from('delivery_images').delete().in('id', insertedIds);
      if (uploadedPaths.length) await this.#client.storage.from('deliveries').remove(uploadedPaths);
      throw error;
    }
    return this.listDeliveryImages(deliveryId);
  }

  async removeDeliveryImage(deliveryId: string, image: AdminDeliveryImage): Promise<void> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const remaining = (await this.listDeliveryImages(deliveryId)).filter(
      (current) => current.id !== image.id,
    );
    if (image.isCover && remaining.length) await this.setDeliveryCover(deliveryId, remaining[0].id);

    const { error: deleteError } = await this.#client
      .from('delivery_images')
      .delete()
      .eq('id', image.id)
      .eq('delivery_id', deliveryId);
    if (deleteError) throw deleteError;
    const { error: storageError } = await this.#client.storage
      .from('deliveries')
      .remove([image.storagePath]);
    if (storageError) throw storageError;
    await this.reorderDeliveryImages(
      deliveryId,
      remaining.map((current) => current.id),
    );
  }

  async reorderDeliveryImages(deliveryId: string, imageIds: readonly string[]): Promise<void> {
    if (!this.#client || !imageIds.length) return;
    for (const [index, imageId] of imageIds.entries()) {
      const { error } = await this.#client
        .from('delivery_images')
        .update({ sort_order: 1000 + index })
        .eq('id', imageId)
        .eq('delivery_id', deliveryId);
      if (error) throw error;
    }
    for (const [index, imageId] of imageIds.entries()) {
      const { error } = await this.#client
        .from('delivery_images')
        .update({ sort_order: index })
        .eq('id', imageId)
        .eq('delivery_id', deliveryId);
      if (error) throw error;
    }
  }
  async listCatalogBrands(): Promise<readonly CatalogBrand[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('vehicle_brands')
      .select('id,name,fipe_code')
      .eq('active', true)
      .order('name');
    if (error) throw error;
    return (data ?? []).map((brand) => ({
      id: brand.id as string,
      name: brand.name as string,
      fipeCode: brand.fipe_code as string,
    }));
  }
  async listCatalogModels(brandId: string): Promise<readonly CatalogModel[]> {
    if (!this.#client) throw new Error('Sessão administrativa indisponível.');
    const { data, error } = await this.#client
      .from('vehicle_models')
      .select('id,name,fipe_model_code')
      .eq('brand_id', brandId)
      .eq('active', true)
      .order('name');
    if (error) throw error;
    return (data ?? []).map((model) => ({
      id: model.id as string,
      name: model.name as string,
      fipeModelCode: model.fipe_model_code as string,
    }));
  }

  async listFipeYears(brandCode: string, modelCode: string): Promise<readonly CatalogFipeYear[]> {
    const years = await this.fipeGet<readonly { code: string; name: string }[]>(
      `/brands/${brandCode}/models/${modelCode}/years`,
      `years-${brandCode}-${modelCode}`,
      7 * 24 * 60 * 60 * 1000,
    );
    return years.map((year) => ({
      code: year.code,
      name: year.name,
      modelYear: Number.parseInt(year.name, 10),
    }));
  }

  async getFipeReference(
    brandCode: string,
    modelCode: string,
    yearCode: string,
  ): Promise<FipeReference> {
    const reference = await this.fipeGet<{
      codeFipe: string;
      price: string;
      referenceMonth: string;
      fuel: string;
      modelYear: number;
    }>(
      `/brands/${brandCode}/models/${modelCode}/years/${yearCode}`,
      `reference-${brandCode}-${modelCode}-${yearCode}`,
      24 * 60 * 60 * 1000,
    );
    return {
      code: reference.codeFipe,
      price: this.parseFipePrice(reference.price),
      referenceMonth: reference.referenceMonth,
      fuel: reference.fuel,
      modelYear: Number(reference.modelYear),
    };
  }

  private async fipeGet<T>(path: string, cacheKey: string, ttl: number): Promise<T> {
    const cached = this.readFipeCache<T>(cacheKey);
    if (cached) return cached;

    let response: Response;
    try {
      response = await fetch(`${fipeBaseUrl}${path}`, { signal: AbortSignal.timeout(12_000) });
    } catch {
      throw new Error('Não foi possível consultar a FIPE agora.');
    }
    if (!response.ok) throw new Error(`A FIPE retornou indisponibilidade (${response.status}).`);

    const data = (await response.json()) as T;
    this.writeFipeCache(cacheKey, data, ttl);
    return data;
  }

  private readFipeCache<T>(key: string): T | null {
    if (!isPlatformBrowser(this.#platformId)) return null;
    try {
      const cached = JSON.parse(localStorage.getItem(`mf-fipe-${key}`) ?? 'null') as {
        expiresAt: number;
        data: T;
      } | null;
      return cached && cached.expiresAt > Date.now() ? cached.data : null;
    } catch {
      return null;
    }
  }

  private writeFipeCache<T>(key: string, data: T, ttl: number): void {
    if (!isPlatformBrowser(this.#platformId)) return;
    try {
      localStorage.setItem(`mf-fipe-${key}`, JSON.stringify({ data, expiresAt: Date.now() + ttl }));
    } catch {
      // O cadastro continua funcionando caso o navegador bloqueie armazenamento local.
    }
  }

  private parseFipePrice(value: string): number {
    return Number(
      value
        .replace(/[^\d,]/g, '')
        .replace(/\./g, '')
        .replace(',', '.'),
    );
  }

  private assertVehicleImages(photos: readonly File[]): void {
    const invalid = photos.some(
      (photo) => !acceptedVehicleImageTypes.has(photo.type) || photo.size > maxVehicleImageSize,
    );
    if (invalid) throw new Error('Use JPEG, PNG ou WebP com até 10 MB por arquivo.');
  }

  private buildVehicleImagePath(vehicleId: string, index: number, photo: File): string {
    const safeName =
      photo.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9.]+/g, '-')
        .replace(/(^-|-$)/g, '') || `foto-${index + 1}.jpg`;
    return `${vehicleId}/${Date.now()}-${index}-${safeName}`;
  }

  private assertDeliveryImages(photos: readonly File[]): void {
    const invalid = photos.some(
      (photo) => !acceptedDeliveryImageTypes.has(photo.type) || photo.size > maxDeliveryImageSize,
    );
    if (invalid) throw new Error('Use JPEG, PNG ou WebP com até 10 MB por arquivo.');
  }

  private buildDeliveryImagePath(deliveryId: string, index: number, photo: File): string {
    const safeName =
      photo.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9.]+/g, '-')
        .replace(/(^-|-$)/g, '') || `entrega-${index + 1}.jpg`;
    return `${deliveryId}/${Date.now()}-${index}-${safeName}`;
  }
}

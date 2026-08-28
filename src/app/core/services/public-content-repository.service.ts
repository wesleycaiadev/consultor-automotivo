import { Injectable } from '@angular/core';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface PublicDelivery {
  readonly customer: string;
  readonly city: string;
  readonly testimonial: string;
  readonly vehicle: string;
  readonly imageAlt: string;
  readonly imageUrl: string | null;
}

const supabaseUrl = 'https://urjcjtwveunzixxkdikf.supabase.co';
const supabasePublishableKey = 'sb_publishable_cpqdy12viM8aHIrkRqAuww_PL4nH8yx';

@Injectable({ providedIn: 'root' })
export class PublicContentRepository {
  #client: Promise<SupabaseClient> | null = null;

  async listPublishedDeliveries(): Promise<readonly PublicDelivery[]> {
    const client = await this.client();
    const { data, error } = await client
      .from('deliveries')
      .select(
        'customer_name,vehicle_name,city,testimonial,delivery_images(storage_path,is_cover,sort_order)',
      )
      .eq('status', 'published')
      .order('delivery_date', { ascending: false });

    if (error) throw error;

    return Promise.all(
      ((data ?? []) as unknown as readonly DeliveryRecord[]).map(async (delivery) => {
        const cover =
          [...(delivery.delivery_images ?? [])]
            .sort((first, second) => first.sort_order - second.sort_order)
            .find((image) => image.is_cover) ?? delivery.delivery_images?.[0];
        const imageUrl = cover ? await this.signedDeliveryImage(client, cover.storage_path) : null;

        return {
          customer: delivery.customer_name,
          vehicle: delivery.vehicle_name,
          city: delivery.city,
          testimonial: delivery.testimonial,
          imageAlt: `Entrega de ${delivery.vehicle_name} para ${delivery.customer_name}`,
          imageUrl,
        };
      }),
    );
  }

  private async signedDeliveryImage(
    client: SupabaseClient,
    storagePath: string,
  ): Promise<string | null> {
    const { data, error } = await client.storage
      .from('deliveries')
      .createSignedUrl(storagePath, 60 * 60);

    if (error) throw error;
    return data.signedUrl;
  }

  private client(): Promise<SupabaseClient> {
    this.#client ??= import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(supabaseUrl, supabasePublishableKey, {
        auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
      }),
    );

    return this.#client;
  }
}

interface DeliveryImageRecord {
  readonly is_cover: boolean;
  readonly sort_order: number;
  readonly storage_path: string;
}

interface DeliveryRecord {
  readonly city: string;
  readonly customer_name: string;
  readonly delivery_images: readonly DeliveryImageRecord[] | null;
  readonly testimonial: string;
  readonly vehicle_name: string;
}

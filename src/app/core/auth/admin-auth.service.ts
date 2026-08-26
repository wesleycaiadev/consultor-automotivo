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
  readonly price: number | null;
  readonly status: 'draft' | 'published' | 'sold';
  readonly updated_at: string;
}

const supabaseUrl = 'https://urjcjtwveunzixxkdikf.supabase.co';
const supabasePublishableKey = 'sb_publishable_cpqdy12viM8aHIrkRqAuww_PL4nH8yx';

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
      .select('id,brand,model,version,manufacturing_year,model_year,price,status,updated_at')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as readonly AdminVehicleListItem[];
  }
}

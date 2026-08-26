import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';

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
}

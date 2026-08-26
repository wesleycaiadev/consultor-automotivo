import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AdminAuthService, type AdminVehicleListItem } from '../../core/auth/admin-auth.service';

@Component({
  selector: 'app-admin-vehicle-list-page',
  imports: [DatePipe],
  template: `<section class="vehicles">
    <header>
      <div>
        <p>SHOWROOM</p>
        <h1>Veículos</h1>
      </div>
      <button>Novo veículo</button>
    </header>
    @if (loading()) {
      <p>Carregando veículos…</p>
    } @else if (error()) {
      <p role="alert">{{ error() }}</p>
    } @else if (!vehicles().length) {
      <div class="empty">
        <h2>Nenhum veículo cadastrado.</h2>
        <p>Adicione o primeiro veículo quando a edição estiver disponível.</p>
      </div>
    } @else {
      <div class="table">
        <div class="row head">
          <span>Veículo</span><span>Ano</span><span>Preço</span><span>Status</span
          ><span>Atualizado</span>
        </div>
        @for (vehicle of vehicles(); track vehicle.id) {
          <div class="row">
            <span
              ><b>{{ vehicle.brand }} {{ vehicle.model }}</b
              ><small>{{ vehicle.version }}</small></span
            ><span>{{ vehicle.manufacturing_year }}/{{ vehicle.model_year }}</span
            ><span>{{ vehicle.price ?? 'Consulte' }}</span
            ><span>{{ vehicle.status }}</span
            ><span>{{ vehicle.updated_at | date: 'dd/MM/yyyy' }}</span>
          </div>
        }
      </div>
    }
  </section>`,
  styles: [
    `
      .vehicles {
        padding: var(--space-8);
      }
      header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: var(--space-4);
      }
      h1 {
        margin: 0;
        font: 400 var(--type-display-lg) var(--font-display);
      }
      button {
        min-block-size: 2.75rem;
        padding-inline: var(--space-4);
        border: 0;
        background: var(--mf-ink);
        color: var(--mf-paper);
      }
      .table {
        margin-top: var(--space-6);
        border: 1px solid var(--mf-silver);
      }
      .row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: var(--space-3);
        padding: var(--space-4);
        border-top: 1px solid var(--mf-silver);
      }
      .row:first-child {
        border: 0;
      }
      .head {
        font: 600 var(--type-label) var(--font-ui);
        text-transform: uppercase;
      }
      .row span {
        display: grid;
        gap: var(--space-1);
      }
      small {
        color: var(--mf-graphite);
      }
      .empty {
        margin-top: var(--space-6);
        padding: var(--space-8);
        border: 1px solid var(--mf-silver);
      }
      @media (max-width: 48rem) {
        .vehicles {
          padding: var(--space-5);
        }
        .head {
          display: none;
        }
        .row {
          grid-template-columns: 1fr 1fr;
        }
        .row span:first-child {
          grid-column: span 2;
        }
      }
    `,
  ],
})
export class AdminVehicleListPageComponent implements OnInit {
  readonly auth = inject(AdminAuthService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly vehicles = signal<readonly AdminVehicleListItem[]>([]);
  async ngOnInit() {
    try {
      this.vehicles.set(await this.auth.listVehicles());
    } catch {
      this.error.set('Não foi possível carregar os veículos. Atualize a página e tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { type Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-mf-vehicle-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  styleUrl: './mf-vehicle-card.component.scss',
  template: `
    <article class="mf-vehicle-card">
      <a class="mf-vehicle-card__link" [routerLink]="['/showroom', vehicle().slug]">
        <figure class="mf-vehicle-card__media">
          <img [src]="imageUrl()" [alt]="imageAlt()" width="1200" height="900" loading="lazy" />
        </figure>

        <div class="mf-vehicle-card__content">
          <div class="mf-vehicle-card__identity">
            <h3>{{ vehicle().brand }} {{ vehicle().model }}</h3>
            <p>{{ vehicle().version }}</p>
          </div>

          <dl class="mf-vehicle-card__summary">
            <div>
              <dt>Ano</dt>
              <dd>{{ vehicle().modelYear }}</dd>
            </div>
            <div>
              <dt>Km</dt>
              <dd>{{ vehicle().mileage.toLocaleString('pt-BR') }} km</dd>
            </div>
            <div>
              <dt>Preço</dt>
              <dd>{{ formatPrice(vehicle().price) }}</dd>
            </div>
          </dl>

          @if (showTechnicalMetadata()) {
            <p class="mf-vehicle-card__technical">
              {{ vehicle().transmission }} · {{ vehicle().fuel }} · {{ vehicle().color }}
            </p>
          }
        </div>
      </a>
    </article>
  `,
})
export class MfVehicleCardComponent {
  readonly vehicle = input.required<Vehicle>();
  readonly imageAlt = input.required<string>();
  readonly imageUrl = input.required<string>();
  readonly showTechnicalMetadata = input(false);

  formatPrice(price: number | null): string {
    if (price === null) {
      return 'Consulte';
    }

    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      maximumFractionDigits: 0,
      style: 'currency',
    }).format(price);
  }
}

import { Injectable } from '@angular/core';
import { type Vehicle } from '../../shared/models/vehicle.model';

const WHATSAPP_PHONE_NUMBER = '557998709362';

@Injectable({ providedIn: 'root' })
export class WhatsappComposerService {
  vehicleInterest(vehicle: Vehicle): string {
    const message = [
      'Olá, Felipe! Tenho interesse neste veículo:',
      `${vehicle.brand} ${vehicle.model} ${vehicle.version}`,
      `Ano ${vehicle.modelYear} · ${vehicle.mileage.toLocaleString('pt-BR')} km`,
      'Podemos conversar?',
    ].join('\n');

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  }
}

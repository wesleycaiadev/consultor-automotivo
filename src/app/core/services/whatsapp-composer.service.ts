import { Injectable } from '@angular/core';
import { type Vehicle } from '../../shared/models/vehicle.model';

const WHATSAPP_PHONE_NUMBER = '557998709362';

export interface FinderWhatsappInput {
  readonly brand: string;
  readonly budget: string;
  readonly category: string;
  readonly condition: string;
  readonly model: string;
  readonly notes: string;
}

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

  finderSearch(input: FinderWhatsappInput): string {
    const optionalLines = [
      this.optionalLine('Marca', input.brand),
      this.optionalLine('Modelo', input.model),
      this.optionalLine('Observações', input.notes),
    ].filter((line): line is string => line !== null);
    const message = [
      'Olá, Felipe! Gostaria da sua ajuda para encontrar um veículo.',
      '',
      `Tipo de veículo: ${input.category}`,
      `Faixa de investimento: ${input.budget}`,
      `Condição: ${input.condition}`,
      ...optionalLines,
      '',
      'Podemos conversar?',
    ].join('\n');

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  private optionalLine(label: string, value: string): string | null {
    const normalizedValue = value.trim();
    return normalizedValue ? `${label}: ${normalizedValue}` : null;
  }
}

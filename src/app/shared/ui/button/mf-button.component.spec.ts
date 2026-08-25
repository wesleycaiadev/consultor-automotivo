import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MfButtonComponent } from './mf-button.component';

@Component({
  imports: [MfButtonComponent],
  template: '<app-mf-button [disabled]="disabled()">Encontrar meu carro</app-mf-button>',
})
class ButtonHostComponent {
  readonly disabled = signal(false);
}

describe('MfButtonComponent', () => {
  it('renders an accessible button and respects its disabled state', async () => {
    const fixture = TestBed.createComponent(ButtonHostComponent);
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Encontrar meu carro');
    expect(button.disabled).toBe(false);

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
  });
});

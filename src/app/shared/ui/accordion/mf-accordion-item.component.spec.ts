import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MfAccordionItemComponent } from './mf-accordion-item.component';

@Component({
  imports: [MfAccordionItemComponent],
  template: `
    <app-mf-accordion-item id="procedencia" title="Procedência">
      Conteúdo da procedência.
    </app-mf-accordion-item>
  `,
})
class AccordionHostComponent {}

describe('MfAccordionItemComponent', () => {
  it('toggles a semantic panel through mouse and keyboard activation', () => {
    const fixture = TestBed.createComponent(AccordionHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const panel = fixture.nativeElement.querySelector('#procedencia-content') as HTMLElement;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-controls')).toBe('procedencia-content');
    expect(panel.getAttribute('aria-hidden')).toBe('true');
    expect(panel.hasAttribute('inert')).toBe(true);

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.getAttribute('role')).toBe('region');
    expect(panel.getAttribute('aria-labelledby')).toBe('procedencia-trigger');
    expect(panel.hasAttribute('inert')).toBe(false);

    trigger.dispatchEvent(new KeyboardEvent('keydown', { cancelable: true, key: 'Enter' }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});

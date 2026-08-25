import { TestBed } from '@angular/core/testing';
import { MfFilterTabsComponent } from './mf-filter-tabs.component';

describe('MfFilterTabsComponent', () => {
  it('emits the selected option and remains keyboard focusable', () => {
    const fixture = TestBed.createComponent(MfFilterTabsComponent);
    const selected: string[] = [];
    fixture.componentInstance.selectionChange.subscribe((value) => selected.push(value));
    fixture.componentRef.setInput('options', [
      { id: 'all', label: 'Todos' },
      { id: 'suv', label: 'SUV' },
    ]);
    fixture.componentRef.setInput('selectedId', 'all');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.mf-filter-tabs__button',
    ) as NodeListOf<HTMLButtonElement>;

    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    buttons[1].focus();
    expect(document.activeElement).toBe(buttons[1]);
    buttons[1].click();

    expect(selected).toEqual(['suv']);
  });
});

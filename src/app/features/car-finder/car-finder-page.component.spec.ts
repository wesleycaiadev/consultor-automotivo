import { TestBed } from '@angular/core/testing';
import { CarFinderPageComponent } from './car-finder-page.component';

describe('CarFinderPageComponent', () => {
  it('offers five large categories and updates the selected radio option', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    expect(options).toHaveLength(5);
    expect(options[0].type).toBe('radio');

    options[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.state.draft().category).toBe('sedan');
    expect(fixture.nativeElement.querySelector('.is-selected')?.textContent).toContain('Sedan');
    expect(fixture.nativeElement.querySelector('.mf-finder__selection')?.textContent).toContain(
      'Categoria selecionada',
    );
  });
});

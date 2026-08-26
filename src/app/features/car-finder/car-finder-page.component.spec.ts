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

  it('moves to budget and preserves the category when returning', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.detectChanges();

    const categoryOptions = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    categoryOptions[2].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('app-mf-button button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.state.currentStep()).toBe('budget');
    expect(fixture.nativeElement.textContent).toContain('Qual faixa de investimento');

    const budgetOptions = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    expect(budgetOptions).toHaveLength(5);
    budgetOptions[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.state.draft().budget).toBe('De R$ 100 mil a R$ 150 mil');

    (fixture.nativeElement.querySelector('app-mf-button button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.state.currentStep()).toBe('category');
    expect(fixture.componentInstance.state.draft().category).toBe('hatch');
    expect(fixture.nativeElement.querySelector('.is-selected')?.textContent).toContain('Hatch');
  });
});

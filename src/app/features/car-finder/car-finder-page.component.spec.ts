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

  it('offers a clear condition choice after a valid budget', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.detectChanges();

    const select = (index: number): void => {
      const options = fixture.nativeElement.querySelectorAll(
        '.mf-finder__choices input',
      ) as NodeListOf<HTMLInputElement>;
      options[index].dispatchEvent(new Event('change'));
      fixture.detectChanges();
    };
    const continueFlow = (): void => {
      const buttons = fixture.nativeElement.querySelectorAll(
        'app-mf-button button',
      ) as NodeListOf<HTMLButtonElement>;
      buttons[buttons.length - 1].click();
      fixture.detectChanges();
    };

    select(0);
    continueFlow();
    select(0);
    continueFlow();

    expect(fixture.componentInstance.state.currentStep()).toBe('condition');
    const conditions = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    expect(Array.from(conditions, (option) => option.value)).toEqual(['new', 'used', 'either']);

    conditions[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.state.draft().condition).toBe('used');
    expect(fixture.nativeElement.querySelector('.is-selected')?.textContent).toContain('Seminovo');
  });
});

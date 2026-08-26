import { FinderStateService } from './finder-state.service';

describe('FinderStateService', () => {
  it('requires the three mandatory decisions before completing the flow', () => {
    const state = new FinderStateService();

    expect(state.currentStep()).toBe('category');
    expect(state.goNext()).toBe(false);

    state.selectCategory('suv');
    expect(state.goNext()).toBe(true);
    expect(state.currentStep()).toBe('budget');

    state.selectBudget('Até R$ 200 mil');
    state.goNext();
    expect(state.currentStep()).toBe('condition');

    state.selectCondition('used');
    expect(state.canAdvance()).toBe(true);
  });

  it('preserves choices while moving back and forward through optional steps', () => {
    const state = new FinderStateService();
    state.selectCategory('sedan');
    state.goNext();
    state.selectBudget('De R$ 200 mil a R$ 400 mil');
    state.goNext();
    state.selectCondition('either');
    state.goNext();
    state.setBrand('Porsche');
    state.goNext();
    state.setModel('Macan');
    state.goBack();

    expect(state.currentStep()).toBe('brand');
    expect(state.draft()).toMatchObject({ brand: 'Porsche', model: 'Macan', category: 'sedan' });

    state.goTo('summary');
    expect(state.currentStep()).toBe('summary');
    expect(state.canAdvance()).toBe(true);
  });

  it('resets the flow without any persisted data', () => {
    const state = new FinderStateService();
    state.selectCategory('pickup');
    state.selectBudget('Acima de R$ 400 mil');
    state.setNotes('Uso familiar e viagens longas.');
    state.goTo('notes');
    state.reset();

    expect(state.currentStep()).toBe('category');
    expect(state.draft()).toEqual({
      brand: '',
      budget: null,
      category: null,
      condition: null,
      model: '',
      notes: '',
    });
  });
});

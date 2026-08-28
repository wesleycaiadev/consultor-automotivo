import { TestBed } from '@angular/core/testing';
import { CarFinderPageComponent } from './car-finder-page.component';

describe('CarFinderPageComponent', () => {
  it('offers five large categories and updates the selected radio option', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    expect(options).toHaveLength(8);
    expect(options[0].type).toBe('radio');

    options[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.state.draft().category).toBe('sedan');
    expect(fixture.nativeElement.querySelector('.is-selected')?.textContent).toContain('Sedan');
    expect(fixture.nativeElement.querySelector('.mf-finder__selection')?.textContent).toContain(
      'Categoria selecionada',
    );
  });

  it('moves focus to the new step and preserves the category when returning', async () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.detectChanges();

    const categoryOptions = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    categoryOptions[2].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('app-mf-button button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await Promise.resolve();

    expect(fixture.componentInstance.state.currentStep()).toBe('budget');
    expect(fixture.nativeElement.textContent).toContain('Qual faixa de investimento');
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('#finder-title'));

    const budgetOptions = fixture.nativeElement.querySelectorAll(
      '.mf-finder__choices input',
    ) as NodeListOf<HTMLInputElement>;
    expect(budgetOptions).toHaveLength(6);
    expect(Array.from(budgetOptions, (option) => option.value)).toEqual([
      'Até R$ 50 mil',
      'De R$ 50 mil a R$ 100 mil',
      'De R$ 100 mil a R$ 150 mil',
      'De R$ 150 mil a R$ 250 mil',
      'De R$ 250 mil a R$ 400 mil',
      'Acima de R$ 400 mil',
    ]);
    budgetOptions[2].dispatchEvent(new Event('change'));
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

  it('lets the user skip brand and return without losing previous answers', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.componentInstance.state.selectCategory('suv');
    fixture.componentInstance.state.selectBudget('Até R$ 50 mil');
    fixture.componentInstance.state.selectCondition('either');
    fixture.componentInstance.state.goTo('brand');
    fixture.detectChanges();

    expect(fixture.componentInstance.state.currentStep()).toBe('brand');
    expect(fixture.nativeElement.querySelector('#finder-brand')).not.toBeNull();

    const buttons = fixture.nativeElement.querySelectorAll(
      'app-mf-button button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.state.currentStep()).toBe('model');
    expect(fixture.componentInstance.state.draft().brand).toBe('');

    (fixture.nativeElement.querySelector('app-mf-button button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.componentInstance.state.currentStep()).toBe('brand');
    expect(fixture.componentInstance.state.draft()).toMatchObject({
      budget: 'Até R$ 50 mil',
      category: 'suv',
      condition: 'either',
    });
  });

  it('keeps optional notes within the visible character limit', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    fixture.componentInstance.state.goTo('notes');
    fixture.detectChanges();

    const notes = fixture.nativeElement.querySelector('#finder-notes') as HTMLTextAreaElement;
    expect(notes.maxLength).toBe(500);
    expect(notes.getAttribute('enterkeyhint')).toBe('next');

    notes.value = 'Preciso de conforto para viagens e porta-malas amplo.';
    notes.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.state.draft().notes).toBe(notes.value);
    expect(fixture.nativeElement.querySelector('.mf-finder__count')?.textContent).toContain(
      `${notes.value.length} de 500`,
    );
  });

  it('shows every answer in the summary and lets the user edit an earlier step', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    const { state } = fixture.componentInstance;
    state.selectCategory('suv');
    state.selectBudget('Até R$ 100 mil');
    state.selectCondition('either');
    state.selectUsage('family');
    state.selectPowertrain('balanced');
    state.setNotes('Uso familiar e viagens longas.');
    state.goTo('summary');
    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.mf-finder__summary') as HTMLElement;
    expect(summary.textContent).toContain('SUV');
    expect(summary.textContent).toContain('Até R$ 100 mil');
    expect(summary.textContent).toContain('Tanto faz');
    expect(summary.textContent).toContain('Família');
    expect(summary.textContent).toContain('Equilibrada (1.4 a 2.0)');
    expect(summary.textContent).toContain('Não informado');
    expect(summary.textContent).toContain('Uso familiar e viagens longas.');

    const editBudget = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '.mf-finder__edit',
      ),
    ).find((button) => button.getAttribute('aria-label') === 'Editar Faixa de investimento');
    if (!editBudget) {
      throw new Error('Botão para editar orçamento não encontrado.');
    }
    editBudget.click();
    fixture.detectChanges();

    expect(state.currentStep()).toBe('budget');
    expect(state.draft()).toMatchObject({
      budget: 'Até R$ 100 mil',
      category: 'suv',
      notes: 'Uso familiar e viagens longas.',
    });
  });

  it('opens WhatsApp with the Finder search after the review', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    const { state } = fixture.componentInstance;
    state.selectCategory('suv');
    state.selectBudget('Até R$ 100 mil');
    state.selectCondition('either');
    state.goTo('summary');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      'app-mf-button button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('.mf-finder__whatsapp') as HTMLAnchorElement;
    const url = new URL(link.href);
    expect(state.currentStep()).toBe('whatsapp');
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
    expect(url.searchParams.get('text')).toContain('Tipo de veículo: SUV');
    expect(url.searchParams.get('text')).not.toContain('Marca:');
  });

  it('exposes the current Finder step through an accessible progress indicator', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    const { state } = fixture.componentInstance;
    state.goTo('summary');
    fixture.detectChanges();

    const progress = fixture.nativeElement.querySelector(
      '.mf-finder__progress-meter',
    ) as HTMLDivElement;
    expect(progress.getAttribute('role')).toBe('progressbar');
    expect(progress.getAttribute('aria-valuetext')).toBe('Etapa 9 de 10');
    expect(progress.querySelector('span')?.style.width).toBe('90%');

    state.goTo('whatsapp');
    fixture.detectChanges();

    expect(progress.getAttribute('aria-valuetext')).toBe('Etapa 10 de 10');
    expect(progress.querySelector('span')?.style.width).toBe('100%');
  });

  it('advances after skipping the model and explains blocked progression', () => {
    const fixture = TestBed.createComponent(CarFinderPageComponent);
    const { state } = fixture.componentInstance;
    state.goTo('model');
    fixture.detectChanges();

    const modelButtons = fixture.nativeElement.querySelectorAll(
      'app-mf-button button',
    ) as NodeListOf<HTMLButtonElement>;
    modelButtons[1].click();
    fixture.detectChanges();

    expect(state.currentStep()).toBe('notes');
    expect(fixture.nativeElement.querySelector('.mf-finder__feedback')?.textContent).toContain(
      'Sem preferência de modelo registrada',
    );

    state.reset();
    fixture.componentInstance.goNext();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mf-finder__error')?.textContent).toContain(
      'Escolha um tipo de veículo',
    );
  });
});

import { Injectable, computed, signal } from '@angular/core';

export const FINDER_STEPS = [
  'category',
  'budget',
  'condition',
  'brand',
  'model',
  'notes',
  'summary',
  'whatsapp',
] as const;

export const FINDER_CATEGORIES = ['suv', 'sedan', 'hatch', 'pickup', 'other'] as const;
export const FINDER_CONDITIONS = ['new', 'used', 'either'] as const;

export type FinderStep = (typeof FINDER_STEPS)[number];
export type FinderCategory = (typeof FINDER_CATEGORIES)[number];
export type FinderCondition = (typeof FINDER_CONDITIONS)[number];

export interface FinderDraft {
  readonly brand: string;
  readonly budget: string | null;
  readonly category: FinderCategory | null;
  readonly condition: FinderCondition | null;
  readonly model: string;
  readonly notes: string;
}

const EMPTY_DRAFT: FinderDraft = {
  brand: '',
  budget: null,
  category: null,
  condition: null,
  model: '',
  notes: '',
};

@Injectable({ providedIn: 'root' })
export class FinderStateService {
  readonly draft = signal<FinderDraft>(EMPTY_DRAFT);
  readonly stepIndex = signal(0);
  readonly currentStep = computed(() => FINDER_STEPS[this.stepIndex()]);
  readonly progress = computed(() => (this.stepIndex() + 1) / FINDER_STEPS.length);
  readonly canGoBack = computed(() => this.stepIndex() > 0);
  readonly canAdvance = computed(() => this.isStepValid(this.currentStep()));

  selectCategory(category: FinderCategory): void {
    this.updateDraft({ category });
  }

  selectBudget(budget: string): void {
    this.updateDraft({ budget });
  }

  selectCondition(condition: FinderCondition): void {
    this.updateDraft({ condition });
  }

  setBrand(brand: string): void {
    this.updateDraft({ brand: brand.trim() });
  }

  setModel(model: string): void {
    this.updateDraft({ model: model.trim() });
  }

  setNotes(notes: string): void {
    this.updateDraft({ notes });
  }

  goNext(): boolean {
    if (!this.canAdvance() || this.stepIndex() === FINDER_STEPS.length - 1) {
      return false;
    }

    this.stepIndex.update((index) => index + 1);
    return true;
  }

  goBack(): boolean {
    if (!this.canGoBack()) {
      return false;
    }

    this.stepIndex.update((index) => index - 1);
    return true;
  }

  goTo(step: FinderStep): void {
    this.stepIndex.set(FINDER_STEPS.indexOf(step));
  }

  reset(): void {
    this.draft.set(EMPTY_DRAFT);
    this.stepIndex.set(0);
  }

  private isStepValid(step: FinderStep): boolean {
    const draft = this.draft();

    switch (step) {
      case 'category':
        return draft.category !== null;
      case 'budget':
        return draft.budget !== null;
      case 'condition':
        return draft.condition !== null;
      case 'summary':
        return draft.category !== null && draft.budget !== null && draft.condition !== null;
      default:
        return true;
    }
  }

  private updateDraft(changes: Partial<FinderDraft>): void {
    this.draft.update((draft) => ({ ...draft, ...changes }));
  }
}

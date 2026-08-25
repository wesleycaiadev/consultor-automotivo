import { describe, expect, it } from 'vitest';
import { ShowroomFiltersStore } from './showroom-filters.store';

describe('ShowroomFiltersStore', () => {
  it('updates the selected filter instantly and ignores unsupported values', () => {
    const store = new ShowroomFiltersStore();

    expect(store.selected()).toBe('all');
    store.select('suv');
    expect(store.selected()).toBe('suv');
    expect(store.selectedOption().label).toBe('SUV');

    store.select('conversivel');
    expect(store.selected()).toBe('suv');
  });
});

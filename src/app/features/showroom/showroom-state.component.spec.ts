import { TestBed } from '@angular/core/testing';
import { type ShowroomState, ShowroomStateComponent } from './showroom-state.component';

describe('ShowroomStateComponent', () => {
  const states: readonly ShowroomState[] = ['loading', 'empty', 'error', 'no-results'];

  it('renders every supported state with a clear next step', () => {
    for (const state of states) {
      const fixture = TestBed.createComponent(ShowroomStateComponent);
      fixture.componentRef.setInput('state', state);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('h2')).toBeTruthy();

      if (state === 'loading') {
        expect(fixture.nativeElement.querySelector('[aria-busy="true"]')).toBeTruthy();
      } else {
        expect(fixture.nativeElement.querySelector('a, button')).toBeTruthy();
      }
    }
  });

  it('emits the recovery actions for error and no-results states', () => {
    const fixture = TestBed.createComponent(ShowroomStateComponent);
    let retried = false;
    let cleared = false;
    fixture.componentInstance.retry.subscribe(() => (retried = true));
    fixture.componentInstance.clearFilter.subscribe(() => (cleared = true));

    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    expect(retried).toBe(true);

    fixture.componentRef.setInput('state', 'no-results');
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    expect(cleared).toBe(true);
  });
});

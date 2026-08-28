import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    window.sessionStorage.clear();
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => vi.useRealTimers());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('presents the automotive MF intro and removes it after the opening sequence', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.mf-intro__car')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.mf-intro__mark')?.getAttribute('src')).toBe(
      '/images/mf-mark.png',
    );
    expect(fixture.nativeElement.querySelector('.mf-intro__descriptor')?.textContent).toContain(
      'CURADORIA AUTOMOTIVA',
    );

    await vi.runAllTimersAsync();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mf-intro')).toBeNull();
  });
});

import {
  ApplicationRef,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/seo/seo.service';

type IntroState = 'playing' | 'leaving' | 'hidden';

const INTRO_MIN_TIME = 2200;
const INTRO_MAX_WAIT = 5000;
const INTRO_COMPLETE_HOLD = 220;
const INTRO_EXIT_TIME = 620;

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly introState = signal<IntroState>('playing');
  readonly introProgress = signal(6);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly timers: number[] = [];
  private destroyed = false;

  constructor() {
    inject(SeoService).init();
    afterNextRender(() => void this.startIntro());
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.timers.forEach((timer) => globalThis.clearTimeout(timer));
    });
  }

  private async startIntro(): Promise<void> {
    if (window.location.pathname.startsWith('/admin')) {
      this.introState.set('hidden');
      return;
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (!reducedMotion) this.scheduleProgressMilestones();
    const readiness = Promise.race([this.waitForCriticalContent(), this.delay(INTRO_MAX_WAIT)]);

    if (reducedMotion) {
      await readiness;
      this.finishIntro(80);
      return;
    }

    await Promise.all([readiness, this.delay(INTRO_MIN_TIME)]);
    this.introProgress.set(100);
    await this.delay(INTRO_COMPLETE_HOLD);
    this.finishIntro(INTRO_EXIT_TIME);
  }

  private async waitForCriticalContent(): Promise<void> {
    await Promise.all([
      this.applicationRef.whenStable(),
      this.waitForWindowLoad(),
      this.waitForFonts(),
    ]);
    await this.waitForInitialImages();
  }

  private waitForWindowLoad(): Promise<void> {
    if (document.readyState === 'complete') {
      return Promise.resolve();
    }

    return new Promise((resolve) =>
      window.addEventListener('load', () => resolve(), { once: true }),
    );
  }

  private async waitForFonts(): Promise<void> {
    await document.fonts?.ready;
  }

  private async waitForInitialImages(): Promise<void> {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('img')).filter(
      (image) => image.loading !== 'lazy',
    );
    await Promise.allSettled(images.map((image) => this.waitForImage(image)));
  }

  private waitForImage(image: HTMLImageElement): Promise<void> {
    if (image.complete) {
      return image.decode?.().catch(() => undefined) ?? Promise.resolve();
    }

    return new Promise((resolve) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => resolve(), { once: true });
    });
  }

  private finishIntro(exitTime: number): void {
    if (this.destroyed) return;
    this.introProgress.set(100);
    this.introState.set('leaving');
    this.schedule(() => this.introState.set('hidden'), exitTime);
  }

  private setProgressAtLeast(progress: number): void {
    this.introProgress.update((current) => Math.max(current, progress));
  }

  private scheduleProgressMilestones(): void {
    const milestones = [
      { delay: 240, progress: 22 },
      { delay: 650, progress: 42 },
      { delay: 1080, progress: 63 },
      { delay: 1500, progress: 79 },
      { delay: 1850, progress: 92 },
    ];

    milestones.forEach(({ delay, progress }) =>
      this.schedule(() => this.setProgressAtLeast(progress), delay),
    );
  }

  private delay(delay: number): Promise<void> {
    return new Promise((resolve) => this.schedule(resolve, delay));
  }

  private schedule(callback: () => void, delay: number): void {
    this.timers.push(window.setTimeout(callback, delay));
  }
}

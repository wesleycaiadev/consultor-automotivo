import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

export interface VehicleGalleryImage {
  readonly alt: string;
  readonly src: string;
}

@Component({
  selector: 'app-vehicle-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './vehicle-gallery.component.scss',
  template: `
    @if (activeImage(); as image) {
      <section class="mf-vehicle-gallery" aria-label="Galeria de imagens do veículo">
        <button
          #coverTrigger
          class="mf-vehicle-gallery__cover mf-frame mf-frame--large"
          type="button"
          [attr.aria-label]="'Abrir imagem ' + imagePosition() + ' em tela cheia'"
          (click)="openFullscreen()"
          (pointerdown)="onPointerDown($event)"
          (pointerup)="onPointerUp($event)"
        >
          <img
            [src]="image.src"
            [alt]="image.alt"
            width="1600"
            height="1067"
            fetchpriority="high"
          />
          <span class="mf-vehicle-gallery__expand" aria-hidden="true">Ampliar</span>
        </button>

        <div class="mf-vehicle-gallery__navigation">
          <p aria-live="polite">{{ imagePosition() }} / {{ images().length }}</p>
          <ol aria-label="Selecionar imagem">
            @for (thumbnail of images(); track thumbnail.src; let index = $index) {
              <li>
                <button
                  type="button"
                  [class.is-active]="index === activeIndex()"
                  [attr.aria-label]="'Ver imagem ' + (index + 1)"
                  [attr.aria-pressed]="index === activeIndex()"
                  (click)="selectImage(index)"
                >
                  <img
                    [src]="thumbnail.src"
                    [alt]="thumbnail.alt"
                    width="160"
                    height="112"
                    loading="lazy"
                  />
                </button>
              </li>
            }
          </ol>
        </div>
      </section>
    } @else {
      <p class="mf-vehicle-gallery__unavailable">
        As imagens deste veículo estarão disponíveis em breve.
      </p>
    }

    @if (fullscreenOpen() && activeImage(); as fullscreenImage) {
      <section
        class="mf-vehicle-gallery__modal"
        role="dialog"
        aria-modal="true"
        aria-label="Imagem do veículo em tela cheia"
      >
        <div class="mf-vehicle-gallery__modal-bar">
          <p>{{ imagePosition() }} / {{ images().length }}</p>
          <button #closeButton type="button" (click)="closeFullscreen()">Fechar</button>
        </div>

        <div
          class="mf-vehicle-gallery__modal-media"
          (pointerdown)="onPointerDown($event)"
          (pointerup)="onPointerUp($event)"
        >
          <img [src]="fullscreenImage.src" [alt]="fullscreenImage.alt" width="1600" height="1067" />
        </div>

        @if (images().length > 1) {
          <button
            class="mf-vehicle-gallery__modal-nav mf-vehicle-gallery__modal-nav--previous"
            type="button"
            aria-label="Imagem anterior"
            (click)="previousImage()"
          >
            ←
          </button>
          <button
            class="mf-vehicle-gallery__modal-nav mf-vehicle-gallery__modal-nav--next"
            type="button"
            aria-label="Próxima imagem"
            (click)="nextImage()"
          >
            →
          </button>
        }
      </section>
    }
  `,
})
export class VehicleGalleryComponent {
  readonly images = input.required<readonly VehicleGalleryImage[]>();
  readonly activeIndex = signal(0);
  readonly fullscreenOpen = signal(false);
  readonly activeImage = computed(() => this.images()[this.activeIndex()] ?? null);
  readonly imagePosition = computed(() =>
    this.activeImage() === null ? 0 : this.activeIndex() + 1,
  );

  private readonly platformId = inject(PLATFORM_ID);
  private readonly coverTrigger = viewChild<ElementRef<HTMLButtonElement>>('coverTrigger');
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly pointerStartX = signal<number | null>(null);

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.fullscreenOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeFullscreen();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousImage();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage();
    }
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.images().length) {
      this.activeIndex.set(index);
    }
  }

  openFullscreen(): void {
    this.fullscreenOpen.set(true);
    this.focusAfterRender(this.closeButton);
  }

  closeFullscreen(): void {
    this.fullscreenOpen.set(false);
    this.focusAfterRender(this.coverTrigger);
  }

  previousImage(): void {
    this.moveImage(-1);
  }

  nextImage(): void {
    this.moveImage(1);
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerStartX.set(event.pointerType === 'touch' ? event.clientX : null);
  }

  onPointerUp(event: PointerEvent): void {
    const startX = this.pointerStartX();
    this.pointerStartX.set(null);

    if (startX === null || event.pointerType !== 'touch') {
      return;
    }

    const distance = event.clientX - startX;
    if (Math.abs(distance) < 48) {
      return;
    }

    if (distance > 0) {
      this.previousImage();
      return;
    }

    this.nextImage();
  }

  private moveImage(direction: -1 | 1): void {
    const imageCount = this.images().length;
    if (imageCount < 2) {
      return;
    }

    this.activeIndex.update((index) => (index + direction + imageCount) % imageCount);
  }

  private focusAfterRender(target: () => ElementRef<HTMLButtonElement> | undefined): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => target()?.nativeElement.focus());
  }
}

import { TestBed } from '@angular/core/testing';
import { type VehicleGalleryImage, VehicleGalleryComponent } from './vehicle-gallery.component';

const images: readonly VehicleGalleryImage[] = [
  { alt: 'Porsche em vista frontal', src: 'https://example.com/porsche-front.jpg' },
  { alt: 'Porsche em vista lateral', src: 'https://example.com/porsche-side.jpg' },
  { alt: 'Interior do Porsche', src: 'https://example.com/porsche-interior.jpg' },
];

describe('VehicleGalleryComponent', () => {
  it('changes the selected image and exposes its position', () => {
    const fixture = TestBed.createComponent(VehicleGalleryComponent);
    fixture.componentRef.setInput('images', images);
    fixture.detectChanges();

    const thumbnails = fixture.nativeElement.querySelectorAll(
      '.mf-vehicle-gallery__navigation button',
    ) as NodeListOf<HTMLButtonElement>;
    thumbnails[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeIndex()).toBe(1);
    expect(
      fixture.nativeElement.querySelector('.mf-vehicle-gallery__navigation p')?.textContent,
    ).toContain('2 / 3');
    expect(thumbnails[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('opens fullscreen and supports keyboard navigation and closing', () => {
    const fixture = TestBed.createComponent(VehicleGalleryComponent);
    fixture.componentRef.setInput('images', images);
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('.mf-vehicle-gallery__cover') as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex()).toBe(1);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeFalsy();
  });

  it('moves between images on a horizontal touch gesture', () => {
    const fixture = TestBed.createComponent(VehicleGalleryComponent);
    fixture.componentRef.setInput('images', images);

    fixture.componentInstance.onPointerDown({ clientX: 200, pointerType: 'touch' } as PointerEvent);
    fixture.componentInstance.onPointerUp({ clientX: 100, pointerType: 'touch' } as PointerEvent);

    expect(fixture.componentInstance.activeIndex()).toBe(1);
  });
});

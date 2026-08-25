import { TestBed } from '@angular/core/testing';
import { MfSectionMarkerComponent } from './mf-section-marker.component';

describe('MfSectionMarkerComponent', () => {
  it('renders its section label', () => {
    const fixture = TestBed.createComponent(MfSectionMarkerComponent);
    fixture.componentRef.setInput('label', 'O processo');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('O processo');
  });
});

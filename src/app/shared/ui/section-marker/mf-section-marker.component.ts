import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-mf-section-marker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './mf-section-marker.component.scss',
  template: `
    <p class="mf-section-marker">
      <span aria-hidden="true"></span>
      {{ label() }}
    </p>
  `,
})
export class MfSectionMarkerComponent {
  readonly label = input.required<string>();
}

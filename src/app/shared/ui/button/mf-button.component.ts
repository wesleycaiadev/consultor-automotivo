import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-mf-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './mf-button.component.scss',
  template: `
    <button
      class="mf-button"
      [class.mf-button--secondary]="variant() === 'secondary'"
      [class.mf-frame]="variant() === 'primary'"
      [attr.aria-label]="ariaLabel() || null"
      [disabled]="disabled()"
      [type]="type()"
    >
      <ng-content />
    </button>
  `,
})
export class MfButtonComponent {
  readonly ariaLabel = input('');
  readonly disabled = input(false);
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('primary');
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mf-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="mf-field" [class.mf-field--error]="error()">
      <label class="mf-field__label" [for]="fieldId()">
        {{ label() }}
        @if (required()) {
          <span aria-hidden="true">*</span>
        }
      </label>
      <textarea
        class="mf-field__control mf-field__control--textarea"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-errormessage]="error() ? errorId() : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.autocomplete]="autocomplete() || null"
        [attr.inputmode]="inputMode() || null"
        [disabled]="isDisabled()"
        [id]="fieldId()"
        [name]="name() || null"
        [placeholder]="placeholder() || null"
        [required]="required()"
        [rows]="rows()"
        [value]="value()"
        (blur)="onTouched()"
        (input)="onInput($event)"
      ></textarea>
      @if (helper() && !error()) {
        <p class="mf-field__message" [id]="helperId()">{{ helper() }}</p>
      }
      @if (error()) {
        <p class="mf-field__message mf-field__message--error" [id]="errorId()" role="alert">
          {{ error() }}
        </p>
      }
    </div>
  `,
})
export class MfTextareaComponent implements ControlValueAccessor {
  readonly autocomplete = input('');
  readonly disabled = input(false);
  readonly error = input('');
  readonly helper = input('');
  readonly fieldId = input.required<string>();
  readonly inputMode = input('');
  readonly label = input.required<string>();
  readonly name = input('');
  readonly placeholder = input('');
  readonly required = input(false);
  readonly rows = input(5);
  readonly value = signal('');

  readonly helperId = computed(() => `${this.fieldId()}-helper`);
  readonly errorId = computed(() => `${this.fieldId()}-error`);
  readonly describedBy = computed(() => {
    if (this.error()) {
      return this.errorId();
    }

    return this.helper() ? this.helperId() : null;
  });

  private readonly disabledFromControl = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.disabledFromControl());
  private onChange: (value: string) => void = () => undefined;
  onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl.set(isDisabled);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value.set(value);
    this.onChange(value);
  }
}

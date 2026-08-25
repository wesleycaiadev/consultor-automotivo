import { ChangeDetectionStrategy, Component, OnInit, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-mf-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './mf-accordion-item.component.scss',
  template: `
    <article class="mf-accordion-item" [class.mf-accordion-item--open]="isOpen()">
      <h3 class="mf-accordion-item__heading">
        <button
          class="mf-accordion-item__trigger"
          [attr.aria-controls]="contentId()"
          [attr.aria-expanded]="isOpen()"
          [id]="triggerId()"
          type="button"
          (click)="toggle()"
          (keydown)="onKeydown($event)"
        >
          <span>{{ title() }}</span>
          <span class="mf-accordion-item__indicator" aria-hidden="true"></span>
        </button>
      </h3>

      <div
        class="mf-accordion-item__panel"
        [attr.aria-hidden]="!isOpen()"
        [attr.inert]="isOpen() ? null : ''"
        [id]="contentId()"
        [attr.role]="isOpen() ? 'region' : null"
        [attr.aria-labelledby]="isOpen() ? triggerId() : null"
      >
        <div class="mf-accordion-item__content">
          <ng-content />
        </div>
      </div>
    </article>
  `,
})
export class MfAccordionItemComponent implements OnInit {
  readonly id = input.required<string>();
  readonly title = input.required<string>();
  readonly initiallyOpen = input(false);
  readonly isOpen = signal(false);

  readonly contentId = computed(() => `${this.id()}-content`);
  readonly triggerId = computed(() => `${this.id()}-trigger`);

  ngOnInit(): void {
    this.isOpen.set(this.initiallyOpen());
  }

  toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }
}

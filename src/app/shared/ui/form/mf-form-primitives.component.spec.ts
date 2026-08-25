import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MfInputComponent } from './mf-input.component';
import { MfSelectComponent } from './mf-select.component';
import { MfTextareaComponent } from './mf-textarea.component';

@Component({
  imports: [ReactiveFormsModule, MfInputComponent, MfSelectComponent, MfTextareaComponent],
  template: `
    <app-mf-input
      fieldId="nome"
      label="Nome"
      helper="Como Felipe deve falar com você?"
      autocomplete="name"
      [formControl]="name"
    />
    <app-mf-select
      fieldId="categoria"
      label="Categoria"
      placeholder="Selecione uma categoria"
      [options]="categories"
      [formControl]="category"
    />
    <app-mf-textarea
      fieldId="observacoes"
      label="Observações"
      error="Descreva o que é importante para você."
      [formControl]="notes"
    />
  `,
})
class FormPrimitivesHostComponent {
  readonly name = new FormControl('Felipe');
  readonly category = new FormControl({ value: '', disabled: true });
  readonly notes = new FormControl('');
  readonly categories = [
    { label: 'SUV', value: 'suv' },
    { label: 'Sedan', value: 'sedan' },
  ];
}

describe('MF form primitives', () => {
  it('connects labels, helper/error messages and reactive-form states', () => {
    const fixture = TestBed.createComponent(FormPrimitivesHostComponent);
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('#nome') as HTMLInputElement;
    const category = fixture.nativeElement.querySelector('#categoria') as HTMLSelectElement;
    const notes = fixture.nativeElement.querySelector('#observacoes') as HTMLTextAreaElement;
    const nameLabel = fixture.nativeElement.querySelector('label[for="nome"]') as HTMLLabelElement;

    expect(nameLabel.textContent).toContain('Nome');
    expect(name.getAttribute('aria-describedby')).toBe('nome-helper');
    expect(fixture.nativeElement.querySelector('#nome-helper').textContent).toContain('Felipe');
    expect(category.disabled).toBe(true);
    expect(notes.getAttribute('aria-invalid')).toBe('true');
    expect(notes.getAttribute('aria-errormessage')).toBe('observacoes-error');

    name.value = 'Marques';
    name.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.name.value).toBe('Marques');
  });
});

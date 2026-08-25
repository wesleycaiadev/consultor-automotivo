import { Directive } from '@angular/core';

@Directive({
  selector: 'a[appMfEditorialLink], button[appMfEditorialLink]',
  host: {
    class: 'mf-editorial-link',
  },
})
export class MfEditorialLinkDirective {}

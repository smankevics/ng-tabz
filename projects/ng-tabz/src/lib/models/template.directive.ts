import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabzGroupTemplate]'
})
export class TabzGroupTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTabzComponent } from './ng-tabz.component';
import { NgTabzGroupComponent } from './group/ng-tabz-group.component';
import { TabzGroupTemplateDirective } from './models/template.directive';
import { ResizeableComponent } from './shared/resizeable.component';

@NgModule({
  declarations: [
    ResizeableComponent,
    NgTabzComponent,
    NgTabzGroupComponent,
    TabzGroupTemplateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgTabzComponent,
    NgTabzGroupComponent,
    TabzGroupTemplateDirective
  ]
})
export class NgTabzModule { }

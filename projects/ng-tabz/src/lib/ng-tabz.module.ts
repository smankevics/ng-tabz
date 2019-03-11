import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { NgTabzComponent } from './ng-tabz.component';
import { NgTabzGroupComponent } from './group/ng-tabz-group.component';
import { ResizeHandleComponent } from './resizeHandle/resize-handle.component';

@NgModule({
  declarations: [
    NgTabzComponent,
    NgTabzGroupComponent,
    ResizeHandleComponent
  ],
  imports: [
    CoreModule,
    CommonModule
  ],
  exports: [
    NgTabzComponent,
    NgTabzGroupComponent,
    ResizeHandleComponent
  ],
  entryComponents: [
    ResizeHandleComponent
  ]
})
export class NgTabzModule { }

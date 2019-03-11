import { IPositionable } from './positionable.model';
import { NgTabzComponent } from '../ng-tabz.component';
import { IRenderable } from './renderable.model';

export interface IResizeHandle extends IPositionable {
  id: number;
  vertical: boolean;
}

export interface IResizeHandleComponent extends IRenderable {
  handle: IResizeHandle;

  tabz: NgTabzComponent;
}

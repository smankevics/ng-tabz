import { NgTabzComponent } from '../ng-tabz.component';
import { IPositionable } from './positionable.model';
import { IRenderable } from './renderable.model';

export interface ITabzGroup extends IPositionable {
  id: string;
  name: string;

  minSize?: number;
}

export interface ITabzGroupComponent extends IRenderable {
  item: ITabzGroup;

  tabz: NgTabzComponent;
}

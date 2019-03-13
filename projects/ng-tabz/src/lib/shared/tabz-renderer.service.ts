import { Injectable } from '@angular/core';
import { ITabzComponent } from '../models/tabz.model';
import { ITabzGroup } from '../models/tabz-group.model';
import { IBounds } from '../models/bounds.model';
import { IRenderable } from '../models/renderable.model';

@Injectable()
export class TabzRenderer {
  constructor(private tabz: ITabzComponent) { }

  private get margin(): number {
    return this.tabz.settings.margin || 0;
  }

  calculateBoundsInPixels = (item: ITabzGroup): IBounds => {
    const parentWidth = this.tabz.el.clientWidth - this.margin,
      parentHeight = this.tabz.el.clientHeight - this.margin;

    return {
      left: Math.round(parentWidth / 100 * item.left + this.margin),
      top: Math.round(parentHeight / 100 * item.top + this.margin),
      width: Math.round(parentWidth / 100 * item.width - this.margin),
      height: Math.round(parentHeight / 100 * item.height - this.margin)
    };
  }

  updateHandle = (item: IRenderable): void => {
    item.renderer.setStyle(item.el, 'transform', `translate3d(${item.left}px, ${item.top}px, 0)`);
    item.renderer.setStyle(item.el, 'width', item.width + 'px');
    item.renderer.setStyle(item.el, 'height', item.height + 'px');
  }

  updateItem = (item: IRenderable): void => {
    item.renderer.setStyle(item.el, 'transform', `translate3d(${item.left}px, ${item.top}px, 0)`);
    item.renderer.setStyle(item.el, 'width', item.width + 'px');
    item.renderer.setStyle(item.el, 'height', item.height + 'px');
  }
}

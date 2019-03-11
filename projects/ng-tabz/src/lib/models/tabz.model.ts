import { TabzRenderer } from '../shared/tabz-renderer.service';
import { Renderer2 } from '@angular/core';
import { ITabzGroupComponent } from './tabz-group.model';

export interface ITabz {
  margin?: number;
  [key: string]: any;
}

export interface ITabzComponent {
  settings: ITabz;
  el: HTMLElement;
  tabzRenderer: TabzRenderer;
  renderer: Renderer2;
  items: ITabzGroupComponent[];

  [key: string]: any;
}

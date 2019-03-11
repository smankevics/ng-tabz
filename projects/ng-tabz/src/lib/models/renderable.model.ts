import { Renderer2 } from '@angular/core';
import { IPositionable } from './positionable.model';

export interface IRenderable extends IPositionable {
  el: HTMLElement;
  renderer: Renderer2;
}

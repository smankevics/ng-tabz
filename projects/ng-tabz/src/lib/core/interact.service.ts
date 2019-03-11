import { Injectable } from '@angular/core';
import * as interact from 'interactjs';

@Injectable()
export class InteractService {

  public initResize = (el: HTMLElement, cb: Function): void => {
    interact(el)
      .styleCursor(false)
      .resizable({
        edges: {
          top: '.resize-handle-top',
          right : '.resize-handle-right',
          bottom: '.resize-handle-bottom',
          left: '.resize-handle-left'
        },
        onmove: (event: interact.InteractEvent) => cb(event)
      });
  }

  public initHorizontalMove = (el: HTMLElement, cb: Function): void => {
    interact(el)
      .styleCursor(false)
      .resizable({
        axis: 'x',
        onmove: (event: interact.InteractEvent) => cb(event)
      });
  }

  public initVerticalMove = (el: HTMLElement, cb: Function): void => {
    interact(el)
      .styleCursor(false)
      .resizable({
        axis: 'y',
        onmove: (event: interact.InteractEvent) => cb(event)
      });
  }
}

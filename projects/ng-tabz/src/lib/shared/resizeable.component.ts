import { Component, AfterContentInit, ElementRef, OnDestroy, Input } from '@angular/core';
import * as interact from 'interactjs';

import { IBounds } from '../models/bounds.interface';
import { ITabzGroup } from '../models/tabz-group.interface';

@Component({
  selector: 'tabz-resizeable',
  template: ''
})
export class ResizeableComponent implements OnDestroy, AfterContentInit {
  readonly MIN_SIZE: number = 30;
  readonly RESIZE_HEIGHT: string = 'resizeHeight';
  readonly RESIZE_WIDTH: string = 'resizeWidth';

  private resizeHeightEvent = new Event(this.RESIZE_HEIGHT);
  private resizeWidthEvent = new Event(this.RESIZE_WIDTH);

  private _config: ITabzGroup;
  private _currentSameLayoutChildren: number;
  private _nextSameLayoutChildren: number;

  private prevCurrentHeight;
  private prevNextHeight;
  private prevCurrentWidth;
  private prevNextWidth;

  @Input()
  set config(value: ITabzGroup) {
    this._config = value;
    this._currentSameLayoutChildren = this.calculateSameLayoutChildren(this.config, this.config.verticalLayout);
    this._nextSameLayoutChildren = this.calculateSameLayoutChildren(this.config.next, this.config.verticalLayout);
  }
  get config(): ITabzGroup {
    return this._config;
  }

  constructor(
    public el: ElementRef<HTMLElement>
  ) { }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener(this.RESIZE_HEIGHT, this.resizeHeightEventHandler);
    this.el.nativeElement.removeEventListener(this.RESIZE_WIDTH, this.resizeWidthEventHandler);
  }

  ngAfterContentInit() {
    this.el.nativeElement.addEventListener(this.RESIZE_HEIGHT, this.resizeHeightEventHandler);
    this.el.nativeElement.addEventListener(this.RESIZE_WIDTH, this.resizeWidthEventHandler);

    interact(this.el.nativeElement)
      .resizable({
        edges: {
          left: false,
          right: '.resize-handle-right',
          bottom: '.resize-handle-bottom',
          top: false
        },
        inertia: true,
        onmove: (event: any) => {
          if (event.edges.bottom) {
            this.resizeHeight(event.target, this.nextElement(event.target), event.rect);
          } else if (event.edges.right) {
            this.resizeWidth(event.target, this.nextElement(event.target), event.rect);
          }
        }
      } as any);
  }

  private nextElement = (current: HTMLElement): HTMLElement => {
    const sameTagChildren = Array.prototype.slice.call(current.parentElement.children).filter(el => el.tagName === current.tagName);
    return sameTagChildren[sameTagChildren.indexOf(current) + 1] || null;
  }

  private resizeHeightEventHandler = (event: any) => this.resizeHeight(event.target, this.nextElement(event.target));
  private resizeWidthEventHandler = (event: any) => this.resizeWidth(event.target, this.nextElement(event.target));

  private calculateSameLayoutChildren = (group: ITabzGroup, originalLayout: boolean): number => {
    if (!group) {
      return 0;
    }
    if (!group.children) {
      return 1;
    }

    if (group.verticalLayout !== originalLayout) {
      return group.children.reduce((acc, item) => acc + (item.children ? this.calculateSameLayoutChildren(item, originalLayout) : 1), 0);
    } else {
      return Math.max.apply(null, group.children.map(item => {
        if (item.children) {
          return this.calculateSameLayoutChildren(item, originalLayout);
        } else {
          return item.verticalLayout === originalLayout ? group.children.length : 1;
        }
      }));
    }
  }

  private resizeHeight = (current: HTMLElement, next?: HTMLElement, bounds?: IBounds): void => {
    const totalHeight = this.sameTagChildren(current.parentElement, current.tagName)
        .filter(el => el !== current && el !== next)
        .reduce((acc, el) => acc - el.clientHeight, current.parentElement.clientHeight);

    let newCurrentHeight = this.prevCurrentHeight || current.clientHeight;
    const currentMin = this._currentSameLayoutChildren * this.MIN_SIZE;
    if (bounds) {
      newCurrentHeight = Math.max(bounds.height, currentMin);
    } else {
      if (next && this.config.verticalLayout) {
        newCurrentHeight = Math.max(totalHeight - (this.prevNextHeight || next.clientHeight), currentMin);
      } else {
        newCurrentHeight = totalHeight;
      }
    }
    newCurrentHeight = Math.round(newCurrentHeight);

    let newNextHeight = totalHeight - (!this.config.verticalLayout ? 0 : newCurrentHeight);
    if (next) {
      const nextMin = this._nextSameLayoutChildren * this.MIN_SIZE;
      if (newNextHeight < nextMin) {
        newCurrentHeight -= (nextMin - newNextHeight);
        newNextHeight = nextMin;
      }
    }

    this.prevCurrentHeight = newCurrentHeight;
    current.style.height = newCurrentHeight + 'px';
    this.notifySameLayoutChildren(current, this.resizeHeightEvent);
    if (next) {
      this.prevNextHeight = newNextHeight;
      next.style.height = newNextHeight + 'px';
      this.notifySameLayoutChildren(next, this.resizeHeightEvent);
    }
  }

  private resizeWidth = (current: HTMLElement, next?: HTMLElement, bounds?: IBounds): void => {
    const totalWidth = this.sameTagChildren(current.parentElement, current.tagName)
        .filter(el => el !== current && el !== next)
        .reduce((acc, el) => acc - el.clientWidth, current.parentElement.clientWidth);

    let newCurrentWidth = this.prevCurrentWidth || current.clientWidth;
    const currentMin = this._currentSameLayoutChildren * this.MIN_SIZE;
    if (bounds) {
      newCurrentWidth = Math.max(bounds.width, currentMin);
    } else {
      if (next && !this.config.verticalLayout) {
        newCurrentWidth = Math.max(totalWidth - (this.prevNextWidth || next.clientWidth), currentMin);
      } else {
        newCurrentWidth = totalWidth;
      }
    }
    newCurrentWidth = Math.round(newCurrentWidth);

    let newNextWidth = totalWidth - (this.config.verticalLayout ? 0 : newCurrentWidth);
    if (next) {
      const nextMin = this._nextSameLayoutChildren * this.MIN_SIZE;
      if (newNextWidth < nextMin) {
        newCurrentWidth -= (nextMin - newNextWidth);
        newNextWidth = nextMin;
      }
    }

    this.prevCurrentWidth = newCurrentWidth;
    current.style.width = newCurrentWidth + 'px';
    this.notifySameLayoutChildren(current, this.resizeWidthEvent);
    if (next) {
      this.prevNextWidth = newNextWidth;
      next.style.width = newNextWidth + 'px';
      this.notifySameLayoutChildren(next, this.resizeWidthEvent);
    }
  }

  private sameTagChildren = (el: HTMLElement, tag = el.tagName): HTMLElement[] => {
    return Array.prototype.slice.call(el.children)
      .filter(e => e.tagName === tag);
  }

  private notifySameLayoutChildren = (el: HTMLElement, event: Event): void => {
    this.sameTagChildren(el)
      .map(e => this.sameTagChildren(e)
        .filter((c, i, arr) => i < arr.length - 1)
      )
      .reduce((acc, val) => acc.concat(val), [])
      .forEach((e: HTMLElement) => e.dispatchEvent(event));
  }
}

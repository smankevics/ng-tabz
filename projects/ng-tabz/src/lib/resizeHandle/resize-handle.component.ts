import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, Host, Renderer2, HostBinding } from '@angular/core';
import { NgTabzComponent } from '../ng-tabz.component';
import { InteractService } from '../core/interact.service';
import { IResizeHandle, IResizeHandleComponent } from '../models/resize-handle.model';
import { IBounds } from '../models/bounds.model';

@Component({
  selector: 'resize-handle',
  templateUrl: './resize-handle.component.html',
  styleUrls: ['./resize-handle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizeHandleComponent implements OnInit, IResizeHandleComponent {
  @Input() handle: IResizeHandle;

  left: number;
  top: number;
  width: number;
  height: number;
  el: HTMLElement;
  tabz: NgTabzComponent;

  constructor(
    el: ElementRef<HTMLElement>,
    public renderer: Renderer2,
    private interactService: InteractService
  ) {
    this.el = el.nativeElement;
  }

  private onHandleMove = (e: interact.InteractEvent, vertical = true): void => {
    this.tabz.onItemResize(this, {
      left: !vertical ? this.left + e.dx : this.left,
      top: vertical ? this.top + e.dy : this.top,
      width: this.width,
      height: this.height
    });
  }

  ngOnInit() {
    this.top = this.handle.top;
    this.left = this.handle.left;
    this.height = this.handle.height;
    this.width = this.handle.width;
    this.renderer.setStyle(this.el, 'transform', `translate3d(${this.left}px, ${this.top}px, 0)`);
    this.renderer.setStyle(this.el, 'width', this.width + 'px');
    this.renderer.setStyle(this.el, 'height', this.height + 'px');
    if (this.handle.vertical) {
      this.renderer.setStyle(this.el, 'cursor', 'ew-resize');
      this.interactService.initHorizontalMove(this.el, (e: interact.InteractEvent) => this.onHandleMove(e, false));
    } else {
      this.renderer.setStyle(this.el, 'cursor', 'ns-resize');
      this.interactService.initVerticalMove(this.el, (e: interact.InteractEvent) => this.onHandleMove(e));
    }
  }

}

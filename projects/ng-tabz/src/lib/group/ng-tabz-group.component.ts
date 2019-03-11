import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, Host, Renderer2 } from '@angular/core';
import { ITabzGroup, ITabzGroupComponent } from '../models/tabz-group.model';
import { NgTabzComponent } from '../ng-tabz.component';
import { InteractService } from '../core/interact.service';

@Component({
  selector: 'tabz-group',
  templateUrl: './ng-tabz-group.component.html',
  styleUrls: ['./ng-tabz-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTabzGroupComponent implements OnInit, ITabzGroupComponent {
  @Input() item: ITabzGroup;

  left: number;
  top: number;
  width: number;
  height: number;
  el: HTMLElement;
  tabz: NgTabzComponent;

  constructor(
    el: ElementRef<HTMLElement>,
    @Host() tabz: NgTabzComponent,
    public renderer: Renderer2,
    private interactService: InteractService
  ) {
    this.el = el.nativeElement;
    this.tabz = tabz;
  }

  ngOnInit() {
    const boundsInPixels = this.tabz.tabzRenderer.calculateBoundsInPixels(this.item);
    this.top = boundsInPixels.top;
    this.left = boundsInPixels.left;
    this.height = boundsInPixels.height;
    this.width = boundsInPixels.width;
    this.tabz.tabzRenderer.initItem(this.el, this.item, this.renderer);
    this.tabz.tabzRenderer.updateItem(this);
    this.tabz.addItem(this);
    // this.interactService.initResize(this.el, this.tabz.onItemResize);
  }

}

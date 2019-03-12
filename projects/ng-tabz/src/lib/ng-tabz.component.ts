import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { ITabz, ITabzComponent } from './models/tabz.model';
import { ITabzGroupComponent } from './models/tabz-group.model';
import { TabzRenderer } from './shared/tabz-renderer.service';
import { ResizeHandleComponent } from './resizeHandle/resize-handle.component';
import { IResizeHandle, IResizeHandleComponent } from './models/resize-handle.model';
import { IBounds } from './models/bounds.model';
import { HandleHelper } from './shared/handle.helper';

@Component({
  selector: 'tabz',
  templateUrl: './ng-tabz.component.html',
  styleUrls: ['./ng-tabz.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTabzComponent implements ITabzComponent, OnInit, AfterViewInit {
  @Input() settings: ITabz;
  el: HTMLElement;
  bounds: IBounds;
  tabzRenderer: TabzRenderer;
  items: ITabzGroupComponent[];
  handles: ResizeHandleComponent[];

  constructor(
    el: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    public renderer: Renderer2,
    private factoryResolver: ComponentFactoryResolver
  ) {
    this.el = el.nativeElement;
    this.tabzRenderer = new TabzRenderer(this);
    this.items = [];
    this.handles = [];
  }

  ngOnInit() {
    this.bounds = { left: 0, top: 0, height: this.el.clientHeight, width: this.el.clientWidth };
    console.log(this.bounds);
    this.renderer.listen('window', 'resize', this.onWindowResize.bind(this));
  }

  ngAfterViewInit() {
    this.addGroupResizeHandles();

    setTimeout(() => {
      console.table(this.handles.map(item => ({left: item.left, top: item.top, height: item.height, width: item.width})));
    });
  }

  private onWindowResize() {
    this.bounds = { left: 0, top: 0, height: this.el.clientHeight, width: this.el.clientWidth };
    this.items.forEach(item => this.tabzRenderer.updateItem(item));
  }

  public onItemResize(handle: IResizeHandleComponent, bounds: IBounds) {
    console.log(bounds);
    HandleHelper.checkAndResizeHandles(this.handles, handle, bounds, this.bounds)
      .forEach(item => this.tabzRenderer.updateHandle(item));
  }

  public addItem = (item: ITabzGroupComponent): void => {
    this.items.push(item);
  }

  private addGroupResizeHandles = (groupId = '', vertical = true): void => {
    const childrenIds = HandleHelper.nextLevelChildren(this.items.map(item => item.item.id), groupId);
    if (!childrenIds.length) {
      return;
    }

    // skip drawing resize handle for the last child
    [...childrenIds].splice(0, childrenIds.length - 1)
      .forEach(id => {
        const groupItems: IBounds[] = this.items
          .filter(item => item.item.id.startsWith(id))
          .map(item => ({ top: item.top, left: item.left, height: item.height, width: item.width }));
        const handle = HandleHelper.createResizeHandle(groupItems, vertical, this.settings);
        this.handles.push(this.createResizeHandle(handle));
      });

    // add same level children resize handles
    childrenIds.forEach(id => this.addGroupResizeHandles(id, !vertical));
  }

  private createResizeHandle = (handle: IResizeHandle): ResizeHandleComponent => {
    const factory = this.factoryResolver.resolveComponentFactory(ResizeHandleComponent);
    const component = this.viewContainerRef.createComponent(factory);
    component.instance.tabz = this;
    component.instance.handle = handle;
    this.el.appendChild((component.hostView as any).rootNodes[0] as HTMLElement);
    return component.instance;
  }

}

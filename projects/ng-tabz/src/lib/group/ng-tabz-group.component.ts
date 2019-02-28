import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { ITabzGroup } from '../models/tabz-group.interface';
import { ResizeableComponent } from '../shared/resizeable.component';

@Component({
  selector: 'tabz-group',
  templateUrl: './ng-tabz-group.component.html',
  styleUrls: ['./ng-tabz-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTabzGroupComponent extends ResizeableComponent implements OnInit {
  @Input() config: ITabzGroup;
  @Output() close: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.tabz-group-component') isFinalComponent = false;

  constructor(
    public el: ElementRef<HTMLElement>
  ) {
    super(el);
  }

  ngOnInit() {
    this.isFinalComponent = !this.config.children;
    this.el.nativeElement.style.width = this.config.width + '%';
    this.el.nativeElement.style.height = this.config.height + '%';
  }

  get showRightResizeHandle(): boolean {
    return !this.config.verticalLayout && !!this.config.next;
  }

  get showBottomResizeHandle(): boolean {
    return this.config.verticalLayout && !!this.config.next;
  }

  closeButtonClick = () => this.close.emit();

}

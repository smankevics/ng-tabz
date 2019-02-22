import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { ITabzGroup } from '../models/tabz-group.interface';

@Component({
  selector: 'tabz-group',
  templateUrl: './ng-tabz-group.component.html',
  styleUrls: ['./ng-tabz-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTabzGroupComponent implements OnInit {
  @Input() config: ITabzGroup;

  constructor(
    private el: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this.el.nativeElement.style.width = this.config.width + '%';
    this.el.nativeElement.style.height = this.config.height + '%';
  }

}

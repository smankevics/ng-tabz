import { Component, OnInit, Input, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ITabz } from './models/tabz.interface';
import { TabzGroupTemplateDirective } from './models/template.directive';
import * as interact from 'interactjs';
import { ITabzGroup } from './models/tabz-group.interface';

@Component({
  selector: 'tabz',
  templateUrl: './ng-tabz.component.html',
  styleUrls: ['./ng-tabz.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgTabzComponent implements OnInit, AfterContentInit {
  readonly MIN_SIZE: number = 30;

  @ContentChildren(TabzGroupTemplateDirective) templates: QueryList<TabzGroupTemplateDirective>;

  @Input() settings: ITabz;

  public groupTemplate;

  constructor() { }

  ngOnInit() {

  }

  getTabGroupClass = (group: ITabzGroup) => {
    const horizontal = group.height === 100;
    if (horizontal) {
      return 'tabz-flex-col resizeable-right';
    } else {
      return 'tabz-flex-row resizeable-bottom';
    }
  }

  ngAfterContentInit() {
    this.groupTemplate = this.templates.first.template;

    interact('.resizeable-right:not(:last-child)')
      .resizable({
        allowFrom: '.resize-handle-right',
        edges: { left: false, right: true, bottom: false, top: false },
        axis: 'x',
        restrictEdges: {
          outer: 'parent',
          endOnly: true
        }
      } as any)
      .on('resizemove', (event: any) => {
        const current = event.target,
          next = current.nextElementSibling,
          parentWidth = current.parentElement.clientWidth,
          currentWidth = current.clientWidth,
          nextWidth = next.clientWidth;

        let newCurrentWidth = event.rect.width,
          newNextWidth = nextWidth + (currentWidth - newCurrentWidth);

        if (newCurrentWidth < this.MIN_SIZE) {
          newCurrentWidth = this.MIN_SIZE;
          newNextWidth = currentWidth + nextWidth - this.MIN_SIZE;
        } else if (newNextWidth < this.MIN_SIZE) {
          newCurrentWidth = currentWidth + nextWidth - this.MIN_SIZE;
          newNextWidth = this.MIN_SIZE;
        }

        const newCurrentPercWidth = newCurrentWidth / parentWidth * 100,
          newNextPercWidth = newNextWidth / parentWidth * 100;

        current.style.width = newCurrentPercWidth + '%';
        next.style.width = newNextPercWidth + '%';
      });

    interact('.resizeable-bottom:not(:last-child)')
      .resizable({
        allowFrom: '.resize-handle-bottom',
        edges: { left: false, right: false, bottom: true, top: false },
        axis: 'y',
        restrictEdges: {
          outer: 'parent',
          endOnly: true
        }
      } as any)
      .on('resizemove', (event: any) => {
        const current = event.target,
          next = current.nextElementSibling,
          parentHeight = current.parentElement.clientHeight,
          currentHeight = current.clientHeight,
          nextHeight = next.clientHeight;

        let newCurrentHeight = event.rect.height,
          newNextHeight = nextHeight + (currentHeight - newCurrentHeight);

        if (newCurrentHeight < this.MIN_SIZE) {
          newCurrentHeight = this.MIN_SIZE;
          newNextHeight = currentHeight + nextHeight - this.MIN_SIZE;
        } else if (newNextHeight < this.MIN_SIZE) {
          newCurrentHeight = currentHeight + nextHeight - this.MIN_SIZE;
          newNextHeight = this.MIN_SIZE;
        }

        const newCurrentPercWidth = newCurrentHeight / parentHeight * 100,
          newNextPercWidth = newNextHeight / parentHeight * 100;

        current.style.height = newCurrentPercWidth + '%';
        next.style.height = newNextPercWidth + '%';
      });
  }

}

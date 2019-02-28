import { Component, Input, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { ITabz } from './models/tabz.interface';
import { TabzGroupTemplateDirective } from './models/template.directive';
import { ITabzGroup } from './models/tabz-group.interface';
import { SettingsUtils } from './shared/settings-utils.service';

@Component({
  selector: 'tabz',
  templateUrl: './ng-tabz.component.html',
  styleUrls: ['./ng-tabz.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsUtils]
})
export class NgTabzComponent implements AfterContentInit {
  @ContentChildren(TabzGroupTemplateDirective) templates: QueryList<TabzGroupTemplateDirective>;
  private _settings: ITabz;

  @Input()
  set settings(value: ITabz) {
    this._settings = this.settingsUtils.load(value);
  }
  get settings(): ITabz {
    return this._settings;
  }

  public groupTemplate: TemplateRef<any>;

  constructor(public settingsUtils: SettingsUtils) { }

  ngAfterContentInit() {
    this.groupTemplate = this.templates.first.template;
  }

  private removeChildrenByName = (source: ITabzGroup, parent: ITabzGroup, name: string): boolean => {
    if (!source.children) {
      return false;
    }
    let empty = false;
    source.children.forEach((c, i) => {
      empty = this.removeChildrenByName(c, source, name);
      if (c.name === name || empty) {
        source.children.splice(i, 1);
      }
    });
    if (source.children.length === 1 && source.children[0].children && parent) {
      source.children[0].children.forEach(c => parent.children.push(c));
      return true;
    }
    if (!source.children.length) {
      return true;
    }
  }

  remove = (source: ITabzGroup): void => {
    let empty = false;
    this._settings.groups.forEach((g, i) => {
      empty = this.removeChildrenByName(g, null, source.name);
      if (g.name === source.name || empty) {
        this._settings.groups.splice(i, 1);
      }
    });
  }

}

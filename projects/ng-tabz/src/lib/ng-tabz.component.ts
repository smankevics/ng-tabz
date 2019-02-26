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

}

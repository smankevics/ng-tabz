import { Injectable } from '@angular/core';
import { ITabz } from '../models/tabz.interface';
import { ITabzGroup } from '../models/tabz-group.interface';

@Injectable()
export class SettingsUtils {

  private populateGroup = (group: ITabzGroup, parent: ITabzGroup, next: ITabzGroup): ITabzGroup => {
    group.parent = parent;
    group.next = next;
    group.verticalLayout = parent ? !parent.verticalLayout : (next ? group.width === next.width : false);
    group.children = group.children && group.children.map((c, i) => {
      return this.populateGroup(c, group, (i + 1 < group.children.length) ? group.children[i + 1] : null );
    });
    return group;
  }

  public load = (settings: ITabz): ITabz => {
    settings.groups.forEach((g, i) => this.populateGroup(g, null, (i + 1 < settings.groups.length) ? settings.groups[i + 1] : null));
    return settings;
  }
}

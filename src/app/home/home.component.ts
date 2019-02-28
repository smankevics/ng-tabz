import { Component } from '@angular/core';
import { ITabz, ITabzGroup } from 'projects/ng-tabz/src/public_api';
import { ConcatSource } from 'webpack-sources';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public tabzSettings: ITabz = {
    groups: [
      { id: 1, name: '1', height: 100, width: 50, children: [
        { id: 2, name: '1.1', height: 40, width: 100 },
        { id: 3, name: '1.2', height: 60, width: 100, children: [
          { id: 4, name: '1.2.1', height: 100, width: 30 },
          { id: 5, name: '1.2.2', height: 100, width: 70, children: [
            { id: 2, name: '1.2.2.1', height: 40, width: 100 },
            { id: 3, name: '1.2.2.2', height: 60, width: 100, children: [
              { id: 4, name: '1.2.2.2.1', height: 100, width: 30 },
              { id: 5, name: '1.2.2.2.2', height: 100, width: 70 }
            ]}
          ] }
        ]}
      ]},
      { id: 6, name: '2', height: 100, width: 40, children: [
        { id: 7, name: '2.1', height: 60, width: 100 },
        { id: 8, name: '2.2', height: 40, width: 100 }
      ] },
      { id: 9, name: '3', height: 100, width: 10, children: [
        { id: 10, name: '3.1', height: 30, width: 100 },
        { id: 11, name: '3.2', height: 30, width: 100 },
        { id: 12, name: '3.3', height: 40, width: 100 }
      ] }
    ]
  };

  // private removeChildrenByName = (source: ITabzGroup, name: string): ITabzGroup => {
  //   return {
  //     ...source,
  //     children: source.children && source.children
  //       .map(c => this.removeChildrenByName(c, name))
  //       .filter(c => c.name !== name)
  //   };
  // }

  // remove = (name: string): void => {
  //   this.tabzSettings = {
  //     ...this.tabzSettings,
  //     groups: this.tabzSettings.groups
  //       .map(g => this.removeChildrenByName(g, name))
  //       .filter(c => c.name !== name)
  //   };
  // }
}

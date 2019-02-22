import { Component } from '@angular/core';
import { ITabz } from 'projects/ng-tabz/src/public_api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public tabzSettings: ITabz = {
    groups: [
      { id: 1, name: '1', height: 100, width: 50, children: [
        { id: 3, name: '1.1', height: 40, width: 100 },
        { id: 4, name: '1.2', height: 60, width: 100, children: [
          { id: 3, name: '1.2.1', height: 100, width: 30 },
          { id: 3, name: '1.2.2', height: 100, width: 70 }
        ]}
      ]},
      { id: 2, name: '3', height: 100, width: 40, children: [
        { id: 3, name: '3.1', height: 60, width: 100 },
        { id: 4, name: '3.2', height: 40, width: 100 }
      ] },
      { id: 2, name: '2', height: 100, width: 10, children: [
        { id: 3, name: '2.1', height: 30, width: 100 },
        { id: 4, name: '2.2', height: 30, width: 100 },
        { id: 4, name: '2.3', height: 40, width: 100 }
      ] }
    ]
  };
}

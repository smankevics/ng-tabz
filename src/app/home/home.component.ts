import { Component } from '@angular/core';
import { ITabz, ITabzGroup } from 'projects/ng-tabz/src/public_api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public settings: ITabz = {
    margin: 4
  };

  public groups: ITabzGroup[] = [
    { id: '1.1.1.1', name: '1.1.1.1', left: 0, top: 0, height: 25, width: 25 },
    { id: '1.1.1.2', name: '1.1.1.2', left: 0, top: 25, height: 25, width: 25 },
    { id: '1.1.2', name: '1.1.2', left: 25, top: 0, height: 50, width: 15 },
    { id: '1.2.1', name: '1.2.1', left: 0, top: 50, height: 50, width: 15 },
    { id: '1.2.2.1', name: '1.2.2.1', left: 15, top: 50, height: 25, width: 25 },
    { id: '1.2.2.2', name: '1.2.2.2', left: 15, top: 75, height: 25, width: 25 },
    { id: '2', name: '2', left: 40, top: 0, height: 100, width: 30 },
    { id: '3.1', name: '3.1', left: 70, top: 0, height: 33, width: 30 },
    { id: '3.2', name: '3.2', left: 70, top: 33, height: 33, width: 30 },
    { id: '3.3', name: '3.3', left: 70, top: 66, height: 34, width: 30 }
  ];
}

import { Component } from '@angular/core';
import { ITabz, ITabzGroup } from 'projects/ng-tabz/src/public_api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public settings: ITabz = {
    margin: 1
  };

  public groups: ITabzGroup[] = [
    { id: '1.1.1', name: '1.1.1', left: 0, top: 0, height: 40, width: 10 },
    { id: '1.1.2', name: '1.1.2', left: 10, top: 0, height: 40, width: 30 },
    { id: '1.1.3', name: '1.1.3', left: 40, top: 0, height: 40, width: 20 },
    { id: '1.2', name: '1.2', left: 0, top: 40, height: 60, width: 60 },
    { id: '2', name: '2', left: 60, top: 0, height: 100, width: 40 }
  ];
}

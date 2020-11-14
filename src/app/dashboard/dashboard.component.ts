import { Component, OnInit } from '@angular/core';
import { DashboardModel } from './dashboard.model';
import { DashboardService } from '../../utils/services'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  model: Array<DashboardModel>

  constructor(
    private dashboardService: DashboardService,
    private notifier: NotifierService
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  async ngOnInit() {
    try {
      this.model = <Array<DashboardModel>>await this.dashboardService.listAsync();
      let count = 0;
      let titles = []
      this.model['data'].forEach(function (value) {
        count++;
        if (value["advertisementTitle"].length < 25) {
          titles.push(value["advertisementTitle"])
        }
        else {
          titles.push(value["advertisementTitle"].substring(0, 22) + "...")
        }
      });
      for (let i = 0; i < count; i++) {
        this.model['data'][i]["advertisementTitle"] = titles[i];
      }
    }
    catch (error) {
      this.showNotification('error', error.message);
    }
  }
}

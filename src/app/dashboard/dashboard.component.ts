import { Component, OnInit } from '@angular/core';
import { DashboardModel } from './dashboard.model';
import {DashboardService} from '../../utils/services'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  model: Array<DashboardModel>

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
    try {
      this.model = <Array<DashboardModel>> await this.dashboardService.listAsync()
      console.log(this.model)
    } catch (error) {
      console.log(error)
    }
  }

  date: Date = new Date();

}

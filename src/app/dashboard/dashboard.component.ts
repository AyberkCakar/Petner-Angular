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
      
      let count=0;
      let titles=[]
      this.model['data'].forEach(function (value) {
        count++;
        
        if(value["advertisementTitle"].length <25){
          titles.push(value["advertisementTitle"])
        }
        
        else{
          titles.push(value["advertisementTitle"].substring(0, 22)+"...")
        }
        console.log(value["advertisementTitle"].length);
        
      });

      for (let i = 0; i < count; i++) {
       this.model['data'][i]["advertisementTitle"]=titles[i];
      }
      
      console.log(this.model) 
    }  
    catch (error) {
      console.log(error)
    }
  }




}

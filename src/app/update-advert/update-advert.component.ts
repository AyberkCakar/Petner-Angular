import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardModel } from '../Dashboard/dashboard.model';
import {NotifierService} from 'angular-notifier';
import { AdvertService } from 'src/utils/services';

@Component({
  selector: 'app-update-advert',
  templateUrl: './update-advert.component.html',
  styleUrls: ['./update-advert.component.scss']
})
export class UpdateAdvertComponent implements OnInit {
  model: DashboardModel = new DashboardModel();
  constructor(
    private _router: ActivatedRoute,
    private notifier: NotifierService,
    private advertService: AdvertService
  ) { }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model.advertisementID = this._router.snapshot.paramMap.get('id');
      this.model = <DashboardModel>await this.advertService.findAdvertAsync(this.model.advertisementID);
      console.log(this.model)
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }
}

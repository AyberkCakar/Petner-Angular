import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardModel } from '../Dashboard/dashboard.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-update-advert',
  templateUrl: './update-advert.component.html',
  styleUrls: ['./update-advert.component.scss']
})
export class UpdateAdvertComponent implements OnInit {
  model: DashboardModel = new DashboardModel();
  constructor(
    private _router: ActivatedRoute,
    private notifier: NotifierService
  ) { }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit(){
    try {
      this.model.advertisementID = this._router.snapshot.paramMap.get('id');
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }
}

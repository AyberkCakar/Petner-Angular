import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AdvertService } from 'src/utils/services';
import { DashboardModel } from '../dashboard/dashboard.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  model: Array<DashboardModel>

  constructor(
    private advertService: AdvertService,
    private notifier: NotifierService,
  ) { }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async ngOnInit() {
    try {
      this.model =<Array<DashboardModel>> await this.advertService.getFavoriteAdvertAsync();
      console.log(this.model);
    }  
    catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DashboardModel } from '../Dashboard/dashboard.model';
import {AdvertService} from '../../utils/services'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  model: Array<DashboardModel>
  ID: string;
  constructor(
    private advertService: AdvertService,
    private modalService: NgbModal,
    private notifier: NotifierService
    ) { }

    public showNotification( type: string, message: string ): void {
      this.notifier.notify( type, message );
    }

    async ngOnInit() {
      try {
        this.model =<Array<DashboardModel>> await this.advertService.getMineAdvertAsync();
      }  
      catch (error) {
        this.showNotification( 'error', error.message );      
      }
    }
    openSmallModal( smallModalContent , ID: string) {
      this.ID = ID;
      this.modalService.open( smallModalContent, { size : 'md' } );
    }

    async onDelete()
    {
        try {
          let response = await this.advertService.deleteAsync(this.ID);
          console.log(response);
          await this.showNotification( 'success', response['message'] );
          this.modalService.dismissAll();
          this.ngOnInit();
        } catch (error) {
          this.showNotification( 'error', error.message );
        }
    }
}

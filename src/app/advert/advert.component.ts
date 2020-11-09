import { Component, OnInit } from '@angular/core';
import { DashboardModel } from '../Dashboard/dashboard.model';
import {DashboardService} from '../../utils/services'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  model: Array<DashboardModel>
  ID: string;
  constructor(
    private dashboardService: DashboardService,
    private modalService: NgbModal
    ) { }

    async ngOnInit() {
      try {
        this.model = <Array<DashboardModel>> await this.dashboardService.listAsync()
        console.log(this.model)

      }  
      catch (error) {
        console.log(error)
      }
    }
    openSmallModal( smallModalContent , ID: string) {
      this.ID = ID;
      this.modalService.open( smallModalContent, { size : 'sm' } );
    }

    async onDelete()
    {
        // istek
    }
}

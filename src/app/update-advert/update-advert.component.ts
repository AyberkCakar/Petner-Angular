import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardModel } from '../Dashboard/dashboard.model';

@Component({
  selector: 'app-update-advert',
  templateUrl: './update-advert.component.html',
  styleUrls: ['./update-advert.component.scss']
})
export class UpdateAdvertComponent implements OnInit {
  model: DashboardModel = new DashboardModel();
  constructor(
    private _router: ActivatedRoute 
  ) { }

  async ngOnInit(){
    this.model.advertisementID = this._router.snapshot.paramMap.get('id');

  }

}

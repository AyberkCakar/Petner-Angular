import { Component, OnInit } from '@angular/core';
import {AdvertService} from '../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageModel} from './image.model'

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  id: string;
  response;
  imageObject: Array<object>;
  constructor( private _router: ActivatedRoute ,private router: Router,private advertService: AdvertService) { }

  async ngOnInit() {
    try {
      let image = [];
      const model: ImageModel = new ImageModel();
      this.id = this._router.snapshot.paramMap.get('id');
      this.response =  await this.advertService.getAdvertAsync(this.id);
      this.response.data.advertisementAnimal.animalPhotos.forEach(await function (value) {
        model.image = value;
        model.thumbImage = value;
        image.push(model);
      });
      this.imageObject = image;
      if(this.response.error === 'false')
      {
        console.log(this.response)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

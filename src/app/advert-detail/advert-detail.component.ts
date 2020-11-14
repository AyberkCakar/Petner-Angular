import { Component, OnInit } from '@angular/core';
import { AdvertService, CommentService } from '../../utils/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from './image.model'
import { NotifierService } from 'angular-notifier';
import { CommentModel} from './comment.model';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  comment: CommentModel = new CommentModel();
  id: string;
  response;
  imageObject: Array<object>;
  constructor(
    private _router: ActivatedRoute,
    private router: Router,
    private advertService: AdvertService,
    private commentService: CommentService,
    private notifier: NotifierService
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  async ngOnInit() {
    try {
      let image = [];
      
      const model: ImageModel = new ImageModel();
      this.id = this._router.snapshot.paramMap.get('id');
      this.response = await this.advertService.findAdvertAsync(this.id);
      console.log(this.response)
      this.response['data'].advertisementAnimal.animalPhotos.forEach(await function (value) {
        model.image = value;
        model.thumbImage = value;
        image.push(model);
      });
      this.imageObject = image;
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

  async createComment(comment:string){
    this.comment.comment = comment
    try {
      const res=await this.commentService.insertAsync(this.id, this.comment)
      if(res['error']==true){
        this.showNotification( 'error', res['message'] );      
      }else{
        this.showNotification( 'success', res['message'] ); 
      }
      this.ngOnInit()
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AdvertService, CommentService } from '../../utils/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from './image.model'
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModel} from './comment.model';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  ID: string;
  comment: CommentModel = new CommentModel();
  id: string;
  response;
  imageObject: Array<object>;
  constructor(
    private _router: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
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
      $('#comment').val(" ")
      this.ngOnInit()
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }


  async onRemove(index: number)
  {
    try {
      const id = '#'+index
      $(id).remove();
      this.showNotification( 'success', 'Yorumunuz Başarıyla Silinidi.' ); 
    } catch (error) {
      this.showNotification( 'error', error['message'] );      
    }
  }

  openSmallModal( smallModalContent , ID: string) {
    this.ID = ID;
    this.modalService.open( smallModalContent, { size : 'md' } );
  }

  async onDelete()
  {
      try {
        let response = await this.commentService.deleteAsync(this.ID, this.id);
        await this.showNotification( 'success', response['message'] );
        this.modalService.dismissAll();
        this.ngOnInit();
      } catch (error) {
        this.showNotification( 'error', error.message );
      }
  }
}

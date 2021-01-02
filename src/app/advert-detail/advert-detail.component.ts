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
  colors: string[] = ['#fe4a49', '#2ab7ca', '#854442','#011f4b', '#4a4e4d', '#ee4035'];
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

    for (var i = 0; i < this.response['data']['comments'].length; i++) {
      console.log(i);
      let name=this.response['data']['comments'][i]["personName"]
      let surname=this.response['data']['comments'][i]["personLastName"]
      this.response['data']['comments'][i]['avatarText']= this.getAvatarText(name,surname)
      this.response['data']['comments'][i]['avatarColor'] = this.getAvatarColorCode(name)
      console.log(this.getAvatarColorCode(this.response['data']['comments'][i]["personName"]))
    }

    console.log(this.response['data']['comments'])
  }
  getAvatarColorCode(name:string){
    var totalAsciCode=0;
    for (var i = 0; i < name.length; i++) {
      totalAsciCode+=name.charCodeAt(i);
    }
    return this.colors[totalAsciCode%6];
  }

  getAvatarText(name:string,surname:string){
    return (name.charAt(0)+surname.charAt(0)).toUpperCase()
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

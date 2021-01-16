import { Component, OnInit } from '@angular/core';
import { AdvertService, CommentService } from '../../utils/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModel } from './image.model'
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModel } from './comment.model';
import { AdvertisementModel } from './advertisement.model';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  ID: string;
  comments: Array<CommentModel>;
  advertisement: AdvertisementModel = new AdvertisementModel();
  comment: CommentModel = new CommentModel();
  id: string;
  colors: string[] = ['#fe4a49', '#2ab7ca', '#854442', '#011f4b', '#4a4e4d', '#ee4035'];
  response;
  imageObject: Array<object>;
  favorite;

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

  async onLike(advertisementID, commentID, isFavorited) {
    try {
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].commentID == commentID) {
          if (isFavorited == false) {
            this.favorite = true;
          }
          else {
            this.favorite = false;
          }
        }
      }

      this.commentService.favoriteCommentAsync(this.favorite, advertisementID, commentID);

      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].commentID == commentID) {
          if (isFavorited == false) {
            this.comments[i].isFavorited = true;
            this.comments[i].favoritedCount = Number(this.comments[i].favoritedCount) + 1;
          }
          else {
            this.comments[i].isFavorited = false;
            this.comments[i].favoritedCount = Number(this.comments[i].favoritedCount) - 1;
          }
        }
      }
    } catch (error) {
      this.showNotification('error', 'Yorumu beğenirken bir hata oluştu !');
    }
  }


  async onAdvertisementLike(advertisementID, isFavorited) {
    try {
      if (isFavorited == false) {
        this.favorite = true;
      }
      else {
        this.favorite = false;
      }

      this.advertService.favoriteAdvertisementAsync(this.favorite, advertisementID);

      if (isFavorited == false) {
        this.advertisement.isFavorited = true;
        this.advertisement.favoriteCount = Number(this.advertisement.favoriteCount) + 1;
      }
      else {
        this.advertisement.isFavorited = false;
        this.advertisement.favoriteCount = Number(this.advertisement.favoriteCount) - 1;
      }
    } catch (error) {
      this.showNotification('error', 'İlanı beğenirken bir hata oluştu !');
    }
  }


  async ngOnInit() {
    try {
      let image = [];

      const model: ImageModel = new ImageModel();
      this.id = this._router.snapshot.paramMap.get('id');
      this.response = await this.advertService.findAdvertAsync(this.id);
      this.comments = <Array<CommentModel>>this.response['data'].comments;
      this.advertisement = <AdvertisementModel>this.response['data'];
      this.response['data'].advertisementAnimal.animalPhotos.forEach(await function (value) {
        model.image = value;
        model.thumbImage = value;
        image.push(model);
      });
      this.imageObject = image;
    } catch (error) {
      this.showNotification('error', error.message);
    }

    for (var i = 0; i < this.comments.length; i++) {
      let name = this.comments[i]["personName"]
      let surname = this.comments[i]["personLastName"]
      this.comments[i]['avatarText'] = this.getAvatarText(name, surname)
      this.comments[i]['avatarColor'] = this.getAvatarColorCode(name)
    }
  }
  getAvatarColorCode(name: string) {
    var totalAsciCode = 0;
    for (var i = 0; i < name.length; i++) {
      totalAsciCode += name.charCodeAt(i);
    }
    return this.colors[totalAsciCode % 6];
  }

  getAvatarText(name: string, surname: string) {
    return (name.charAt(0) + surname.charAt(0)).toUpperCase()
  }

  async createComment(comment: string) {
    this.comment.comment = comment
    try {
      const res = await this.commentService.insertAsync(this.id, this.comment)
      if (res['error'] == true) {
        this.showNotification('error', res['message']);
      } else {
        this.showNotification('success', res['message']);
      }
      $('#comment').val(" ")
      this.ngOnInit()
    } catch (error) {
      this.showNotification('error', error.message);
    }
  }


  async onRemove(index: number) {
    try {
      const id = '#' + index
      $(id).remove();
      this.showNotification('success', 'Yorumunuz Başarıyla Silinidi.');
    } catch (error) {
      this.showNotification('error', error['message']);
    }
  }

  openSmallModal(smallModalContent, ID: string) {
    this.ID = ID;
    this.modalService.open(smallModalContent, { size: 'md' });
  }

  async onDelete() {
    try {
      let response = await this.commentService.deleteAsync(this.ID, this.id);
      await this.showNotification('success', response['message']);
      this.modalService.dismissAll();
      this.ngOnInit();
    } catch (error) {
      this.showNotification('error', error.message);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ImageService, AdvertService } from '../../utils/services';
import { AdvertModel, Animal, Address } from './advert.model';
import { NotifierService } from 'angular-notifier';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {
  advertModel: AdvertModel = new AdvertModel();
  animalModel: Animal = new Animal();
  adressModel: Address = new Address();
  selectedFile: ImageSnippet;
  image: string;
  constructor(
    private imageService: ImageService,
    private AdvertService: AdvertService,
    private notifier: NotifierService
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  handleFileInput(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageupload(this.selectedFile)
    });
    reader.readAsDataURL(file);
  }
  async imageupload(selectfile: ImageSnippet) {
    try {
      const response = await this.imageService.uploadImageAsync(selectfile.file);
      this.image = response['data'];
      await this.showNotification( 'success', response['message'] );
    }
    catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

  async save(title: string, desc: string, adverttype: number, animaltype: string, age: number, gender: string
    , city: string, district: string, street: string, adress: string) {
    this.advertModel.advertisementTitle = title;
    this.advertModel.advertisementExplanation = desc;
    this.advertModel.advertisementType = +adverttype;

    this.animalModel.genre = animaltype;
    this.animalModel.gender = gender;
    this.animalModel.animalPhotos = [this.image, ''];
    this.animalModel.age = +age;
    this.advertModel.advertisementAnimal = this.animalModel;

    this.adressModel.district = district;
    this.adressModel.fullAddress = adress;
    this.adressModel.province = city;
    this.adressModel.latitude = 41.458;
    this.adressModel.longitude = 34.7548;
    this.advertModel.advertisementAddress = this.adressModel;

    try {
      await this.AdvertService.addAsync(this.advertModel);
      await this.showNotification( 'success', /*response['message']*/'test' );

    }
    catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

  ngOnInit(): void {
  }

}

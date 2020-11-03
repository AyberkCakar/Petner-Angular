import { Component, OnInit } from '@angular/core';
import {ImageService,AdvertService } from '../../utils/services';
import {AdvertModel} from './advert.model';



class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {
  advertModel: AdvertModel = new AdvertModel();
  selectedFile: ImageSnippet;
  imagePath: string;

  constructor(private imageService: ImageService,private AdvertService: AdvertService) { }

   handleFileInput(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
     reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageupload(this.selectedFile)
    });
    reader.readAsDataURL(file);
  }

  async imageupload(selectfile: ImageSnippet)
  {
    try {
      const response = await this.imageService.uploadImageAsync(selectfile.file);
      this.imagePath = response['data'];
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  async save(title: string ,desc: string , adverttype: number, animaltype: string, age: number , gender: number
             ,city:string ,district: string, street: string, adress: string)
  {
    this.advertModel.advertisementTitle=title
    this.advertModel.advertisementExplanation=desc
    this.advertModel.advertisementType=adverttype
    this.advertModel.advertisementAnimal.age=age
    this.advertModel.advertisementAnimal.animalPhotos=this.imagePath
    this.advertModel.advertisementAnimal.gender=gender
    this.advertModel.advertisementAnimal.genre=animaltype
    this.advertModel.advertisementAddress.district=district
    this.advertModel.advertisementAddress.fullAddress=adress
    this.advertModel.advertisementAddress.province=city
    this.advertModel.advertisementAddress.latitude=41.458
    this.advertModel.advertisementAddress.longitude=34.7548

    try {
      const response= await this.AdvertService.addAsync(this.advertModel)
      console.log(response)
      
    } 
    catch (error) {
      console.log(error)
    }







  }

  ngOnInit(): void {
  }

}

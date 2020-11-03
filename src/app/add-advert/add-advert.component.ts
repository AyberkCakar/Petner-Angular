import { Component, OnInit } from '@angular/core';
import {ImageService } from '../../utils/services'
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
  selectedFile: ImageSnippet;
  imagePath: string;

  constructor(private imageService: ImageService) { }

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
      const response = await  this.imageService.uploadImageAsync(selectfile.file);
      this.imagePath = response.data;
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }


  ngOnInit(): void {
  }

}

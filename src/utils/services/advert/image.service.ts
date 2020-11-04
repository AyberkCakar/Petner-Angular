import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async uploadImageAsync(image: File) {
    const formData = new FormData();
    formData.append('file', image);
    return await this._apiFetchService.requestAsync('POST','upload-photo',formData);
  }
}

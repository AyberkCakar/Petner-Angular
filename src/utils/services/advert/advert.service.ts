import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  constructor(private _apiFetchService: ApiFetchService) {
  }

  async addAsync(values) {
    
    return await this._apiFetchService.requestAsync('POST','advertisement/add',values,true);
  }
}

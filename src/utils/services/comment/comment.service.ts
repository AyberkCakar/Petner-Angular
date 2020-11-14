import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _apiFetchService: ApiFetchService) {
  }
  
  async insertAsync(id, values){
    const path = 'comment?id='+id;
    return await this._apiFetchService.requestAsync('POST',path,values,true);
  }
}

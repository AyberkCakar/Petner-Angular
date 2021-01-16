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
  async deleteAsync(commentID, AdvID){
    const path = 'comment/delete?AdvID='+AdvID+'&CommentID='+commentID;
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }

  async favoriteCommentAsync(value,id,commentId){
    const path = 'comment/favorite?'+'value='+value+'&id='+id+'&commentId='+commentId;
    console.log(path)
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }
}

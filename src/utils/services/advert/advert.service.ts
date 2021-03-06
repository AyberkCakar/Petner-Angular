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

  async findAdvertAsync(values){
    const path = 'advertisement/get?id='+values;
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }

  async getMineAdvertAsync(){
    return await this._apiFetchService.requestAsync('GET','advertisement/get/mine',null,true);
  }

  async getFavoriteAdvertAsync(){
    return await this._apiFetchService.requestAsync('GET','user/favorites',null,true);
  }  
  
  async favoriteAdvertisementAsync(value,id){
    const path = 'advertisement/favorite?id='+id+'&value='+value;
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }

  async updateAsync(values,id){
    const path = 'advertisement/update?id='+id;
    return await this._apiFetchService.requestAsync('POST',path,values,true);
  }

  
  async updateStatusAsync(id){
    const path = 'advertisement/setSolved?id='+id;
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }
  
  async deleteAsync(id){
    const path = 'advertisement/delete?id='+id;
    return await this._apiFetchService.requestAsync('GET',path,null,true);
  }
}

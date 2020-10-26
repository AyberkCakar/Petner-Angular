import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
  ) {}

  async login(user) {
    try{
      var response = await this._apiFetchService.requestAsync(
        'POST',
        'login',
        user); 
    //this._cookie.set('token',response.data)
    console.log(response);

    return response;
    }catch(error)
    {
      console.log(error);

    }      
      
  }

  async signupAsync(values)
  {
    return await this._apiFetchService.requestAsync('POST','signup',values); 
  }
  async mailsendAsync(values)
  {
    return await this._apiFetchService.requestAsync('POST','resetPassword',values); 
  }

  async newpasswordAsync(values)
  {
    return await this._apiFetchService.requestAsync('POST','newPassword',values); 
  }

}

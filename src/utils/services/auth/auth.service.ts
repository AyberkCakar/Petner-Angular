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
      const response: any = await this._apiFetchService.requestAsync(
        'POST',
        'login',
        user
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name );
      localStorage.setItem('surname', response.data.lastName);
      localStorage.setItem('expires', response.data.expires);

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

  async updateAccountAsync(values)
  {
    return await this._apiFetchService.requestAsync('POST','user/update',values,true);
  }

  async getAccountAsync()
  {
    return await this._apiFetchService.requestAsync('GET','user/me',null,true);
  }

}

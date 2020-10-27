import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';
import {ErrorModel} from '../../error.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService) { }
  model: UserModel = new UserModel();
  error: ErrorModel = new ErrorModel();
  ngOnInit() {
  }

  async onLogin(email: string, password: string)
  {
    this.model.personEmail=email;
    this.model.password=password;
    try{
      let response = await this._authService.login(this.model);
      this.error.error=response['error'];
      this.error.message= response['message'];
      if(this.error.message == 'Giriş Başarılı')
      {
        this.router.navigateByUrl('/dashboard');
      }
    }catch(e)
    {
      this.error.error=true;
      this.error.message= '* Kullanıcı veya Şifre hatalı !';
    }
  }
}

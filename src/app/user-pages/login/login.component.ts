import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService) { }
  model: UserModel = new UserModel();

  ngOnInit() {
  }

  async onLogin(email: string, password: string)
  {
    this.model.personEmail=email;
    this.model.password=password;

    try{
      let response = await this._authService.login(this.model);
      if(response['message'] =='Giriş Başarılı')
      {
        this.router.navigateByUrl('/dashboard');
      }
    }catch(e)
    {
      console.log(e);
      debugger;
    }
  }
}

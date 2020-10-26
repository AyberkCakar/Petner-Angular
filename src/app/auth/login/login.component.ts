import { Component, OnInit } from '@angular/core';
import {UserModel} from './../user.model'
import { AuthService } from '../../utils/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(  private _authService: AuthService) { }

  ngOnInit(): void {
  }

  model: UserModel = new UserModel();

async onLogin(email: string, password: string)
  {
    this.model.personEmail=email;
    this.model.password=password;
    console.log(this.model);
    debugger;

    try{
      var response = await this._authService.login(this.model);
      console.log(response);

    }catch(e)
    {
      console.log(e);
      debugger;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthService) { }
  model: UserModel = new UserModel();

  ngOnInit() {
  }

  async onRegister(name: string, surname: string, number: string, email: string, password: string)
  {
    this.model.personName=name;
    this.model.personLastName=surname;
    this.model.personPhone= number;
    this.model.personEmail=email;
    this.model.password=password;
    console.log(this.model);
    debugger;

    try{
      var response = await this._authService.signupAsync(this.model);
      console.log(response);
      debugger;


    }catch(e)
    {
      console.log(e);
      debugger;
    }
  }
}

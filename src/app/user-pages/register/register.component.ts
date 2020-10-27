import { Component, OnInit } from '@angular/core';
import {UserModel} from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';
import {ErrorModel} from '../../error.model'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService) { }
  model: UserModel = new UserModel();
  error: ErrorModel = new ErrorModel();

  ngOnInit() {
  }

  async onRegister(name: string, surname: string, number: string, email: string, password: string)
  {
    this.model.personName=name;
    this.model.personLastName=surname;
    this.model.personPhone= number;
    this.model.personEmail=email;
    this.model.password=password;

    try{
      let response = await this._authService.signupAsync(this.model);
      this.error.error=response['error'];
      this.error.message= response['message'];
      if(this.error.message == 'Kayıt Başarılı')
      {
        this.router.navigateByUrl('/user-pages/login');
      }

    }catch(e)
    {
      this.error.error=true;
      this.error.message= '* Girilen Bilgiler Hatalı veya Eksik !';
    }
  }
}

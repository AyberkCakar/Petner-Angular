import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PasswordModel} from '../password.model'
import { AuthService } from '../../../utils/services';
import {ErrorModel} from '../../error.model'

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  model: PasswordModel = new PasswordModel();
  error: ErrorModel = new ErrorModel();

  async newPassword(code: string, mail: string, newpassword: string)
  {
    this.model.code = code;
    this.model.personEmail = mail;
    this.model.personPassword = newpassword;
    try{
      let response = await this._authService.newpasswordAsync(this.model);
      this.error.error=response['error'];
      this.error.message = response['message'];

      if( this.error.message == 'Şifre başarıyla güncellendi')
      {
        this.router.navigateByUrl('/user-pages/login');
      }
    }catch(e)
    {
      this.error.error=true;
      this.error.message= '* Bir Problem Oluştu !';
    }
  }
}

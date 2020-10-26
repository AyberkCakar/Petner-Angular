import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PasswordModel} from '../password.model'
import { AuthService } from '../../../utils/services';

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

  async newPassword(code: string, mail: string, newpassword: string)
  {
    this.model.code = code;
    this.model.personEmail = mail;
    this.model.personPassword = newpassword;
    try{
      let response = await this._authService.newpasswordAsync(this.model);
      if(response['message'] == 'Şifre başarıyla güncellendi')
      {
        this.router.navigateByUrl('/user-pages/login');
      }
      console.log(response);

    }catch(e)
    {
      console.log(e);
    }
  }
}

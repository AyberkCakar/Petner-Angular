import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../utils/services';
import {PasswordModel} from '../password.model'
import {ErrorModel} from '../../error.model'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router,private _authService: AuthService) { }

  ngOnInit(): void {
  }
  model: PasswordModel = new PasswordModel();
  error: ErrorModel = new ErrorModel();

  async mailSend(mail: string)
  {
    this.model.personEmail = mail;
    try{
      let response = await this._authService.mailsendAsync(this.model);
      this.error.error=response['error'];
      this.error.message= response['message'];
      if(  this.error.message=='Başarılı')
      {
        await this.router.navigateByUrl('/user-pages/newpassword')
      }
    }catch(e)
    {
      this.error.error=true;
      this.error.message= '* Bir Problem Oluştu !';
    }
  }
}

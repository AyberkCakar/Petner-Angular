import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../utils/services';
import {PasswordModel} from '../password.model'

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

  async mailSend(mail: string)
  {
    this.model.personEmail = mail;

    try{
      debugger;
      let response = await this._authService.mailsendAsync(this.model);
      if(response['message']=='Başarılı')
      {
        await this.router.navigateByUrl('/user-pages/newpassword')
      }
      console.log(response);
    }catch(e)
    {
      console.log(e);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';
import { ErrorModel } from '../../error.model'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService, private notifier: NotifierService) { }
  model: UserModel = new UserModel();
  error: ErrorModel = new ErrorModel();
  ngOnInit() {
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  async onLogin(email: string, password: string) {
    var emailState: Number
    emailState = Number(localStorage.getItem(email));

    this.model.personEmail = email;
    this.model.password = password;
    try {
      if (emailState < 3) {
        let response = await this._authService.login(this.model);
        this.error.error = response['error'];
        this.error.message = response['message'];
        this.showNotification('success',  response['message']);
        if (this.error.message == 'Giriş Başarılı') {
          this.router.navigate(['/dashboard']);
          localStorage.setItem(email, '0');
        }
      }
      else {
        this.showNotification('error', 'Şifrenizi 3 Kereden Fazla Yanlış Girdiniz Hesabınız Bloklandı, Lütfen Şifrenizi Güncelleyiniz !');
      }
    } catch (e) {
      this.error.error = true;
      this.showNotification('error', '* Kullanıcı veya Şifre hatalı !');
      var count: Number;
      var emailState: Number
      emailState = Number(localStorage.getItem(email));
      if (emailState < 3) {
        if (emailState == null) {
          localStorage.setItem(email, '1');
        }
        else {
          count = Number(emailState) + 1;
          localStorage.setItem(email, String(count));
        }
      }
      else {
        this.showNotification('error', 'Şifrenizi 3 Kereden Fazla Yanlış Girdiniz Hesabınız Bloklandı, Lütfen Şifrenizi Güncelleyiniz !');
      }
    }
  }
}
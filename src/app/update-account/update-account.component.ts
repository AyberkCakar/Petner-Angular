import { Component, OnInit,Inject, Renderer2 } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import { UserModel } from '../user-pages/user.model';
import { AuthService } from 'src/utils/services';
import { UpdatePasswordModel } from './update-password-model.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  model: UserModel = new UserModel();
  pswModel: UpdatePasswordModel = new UpdatePasswordModel();
  passwordConfirmation;

  constructor(
    private notifier: NotifierService,
    private authService: AuthService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  async ngOnInit() {
    this.model = <UserModel>await this.authService.getAccountAsync();
    let script = this._renderer2.createElement('script');

    script.type = `text/javascript`;
    script.src = `../../assets/script/password.js`;

    this._renderer2.appendChild(this._document.body, script);
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  async onUpdate(name: string,surname: string,phoneNumber: string){
    try {
      this.model.personName=name;
      this.model.personLastName=surname;
      this.model.personPhone=phoneNumber;
      let response =await this.authService.updateAccountAsync(this.model);
      this.showNotification( 'success', response['message'] );
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

  async onUpdatePsw(newPassword: string,passwordConfirmation:string,oldPassword: string){
    try {
      this.pswModel.newPassword=newPassword;
      this.pswModel.oldPassword=oldPassword;
      if(oldPassword != "")
      {
        if(passwordConfirmation == newPassword)
        {
          let response =await this.authService.updatePasswordAsync(this.pswModel);
          this.showNotification( 'success', response['message'] );
        }
        else{
          this.showNotification( 'error','* Girilen Şifreler Eşleşmiyor!');      
        }
      }
      else{
        this.showNotification( 'error','* Eski Şifrenizi Giriniz!');      
      }
    
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {NotifierService} from 'angular-notifier';
import { UserModel } from '../user-pages/user.model';
import { AuthService } from 'src/utils/services';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  model: UserModel = new UserModel();

  constructor(
    private notifier: NotifierService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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
      
      console.log(response)
      this.showNotification( 'success', response['message'] );
    } catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }


}

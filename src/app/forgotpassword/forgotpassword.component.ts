import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../utils/services';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router,private _authService: AuthService) { }

  ngOnInit(): void {
  }


  async mailSend(mail: string)
  {
    
  }
}

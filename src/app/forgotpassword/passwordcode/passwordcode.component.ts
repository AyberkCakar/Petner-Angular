import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordcode',
  templateUrl: './passwordcode.component.html',
  styleUrls: ['./passwordcode.component.scss']
})
export class PasswordcodeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async newPassword(code: string, mail: string, newpassword: string)
  {

  }
}

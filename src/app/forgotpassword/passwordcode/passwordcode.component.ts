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

  go(){
    this.router.navigateByUrl('/newpassword')
  }
}

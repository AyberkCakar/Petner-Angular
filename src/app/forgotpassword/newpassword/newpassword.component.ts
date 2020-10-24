import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  go(){
    this.router.navigateByUrl('/login');
  }
}

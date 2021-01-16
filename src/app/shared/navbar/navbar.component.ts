import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  name: string;
  surname:string;
  avatarText:string;
  colors: string[] = ['#fe4a49', '#2ab7ca', '#854442','#011f4b', '#4a4e4d', '#ee4035'];
  color:string;
  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    var totalAsciCode=0;
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
    for (var i = 0; i < this.name.length; i++) {
      totalAsciCode+=this.name.charCodeAt(i);
    }
    this.color= this.colors[totalAsciCode%6];
    this.avatarText=(this.name.charAt(0)+this.surname.charAt(0)).toUpperCase()
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }

}

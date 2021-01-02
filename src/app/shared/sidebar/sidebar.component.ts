import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  name: String;
  surname: String;
  avatarText: String;
  colors: string[] = ['#fe4a49', '#2ab7ca', '#854442','#011f4b', '#4a4e4d', '#ee4035'];
  color:string;
  constructor() { }

  ngOnInit() {

    var totalAsciCode=0;
    this.name= localStorage.getItem('name')
    this.surname = localStorage.getItem('surname');
    for (var i = 0; i < this.name.length; i++) {
      totalAsciCode+=this.name.charCodeAt(i);
    }
    this.color= this.colors[totalAsciCode%6];
    console.log(this.color);
    this.avatarText=(this.name.charAt(0)+this.surname.charAt(0)).toUpperCase()
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

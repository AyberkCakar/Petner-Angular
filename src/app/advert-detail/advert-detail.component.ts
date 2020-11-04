import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  imageObject: Array<object> = [{
    image: 'https://petner-cdn.yusufozgul.com/upload-008770818.png',
    thumbImage: 'https://petner-cdn.yusufozgul.com/upload-008770818.png'
},{
image: 'https://petner-cdn.yusufozgul.com/upload-008770818.png',
    thumbImage: 'https://petner-cdn.yusufozgul.com/upload-008770818.png'
}
];
}

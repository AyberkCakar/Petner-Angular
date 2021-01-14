import { Component, OnInit ,NgZone,ViewChild, ElementRef, } from '@angular/core';
import { ImageService, AdvertService } from '../../utils/services';
import { AdvertModel, Animal, Address } from './advert.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {
  advertModel: AdvertModel = new AdvertModel();
  animalModel: Animal = new Animal();
  adressModel: Address = new Address();
  selectedFile: ImageSnippet;
  image: string;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;

  constructor(
    private imageService: ImageService,
    private AdvertService: AdvertService,
    private notifier: NotifierService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  handleFileInput(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    const splitFile = file.name.split('.');
    const imageArray = ['png','jpeg','jpg','gif'];
    var splitFileText = splitFile[splitFile.length-1].toLowerCase()

    if(imageArray.indexOf(splitFileText) >= 0)
    {
      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.imageupload(this.selectedFile)
      });
      reader.readAsDataURL(file);
    }
    else{
      this.showNotification( 'error', 'Sadece Resim Formatı Olabilir !');
    }
  }
  
  async imageupload(selectfile: ImageSnippet) {
    try {
      const response = await this.imageService.uploadImageAsync(selectfile.file);
      this.image = response['data'];
      await this.showNotification( 'success', response['message'] );
    }
    catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

  async save(title: string, desc: string, adverttype: number, animaltype: string, age: number, gender: string
    , city: string, district: string, street: string, adress: string) {
    this.advertModel.advertisementTitle = title;
    this.advertModel.advertisementExplanation = desc;
    this.advertModel.advertisementType = +adverttype;

    this.animalModel.genre = animaltype;
    this.animalModel.gender = gender;
    this.animalModel.animalPhotos = [this.image, ''];
    this.animalModel.age = +age;
    this.advertModel.advertisementAnimal = this.animalModel;

    this.adressModel.district = district;
    this.adressModel.fullAddress = adress;
    this.adressModel.province = city;
    this.adressModel.latitude = this.latitude;
    this.adressModel.longitude = this.longitude;
    this.advertModel.advertisementAddress = this.adressModel;

    try {
      let response =await this.AdvertService.addAsync(this.advertModel);
      await this.showNotification( 'success', response['message'] );
      this.router.navigate(['/advert']);
    }
    catch (error) {
      this.showNotification( 'error', error.message );      
    }
  }

 
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
        }
      }
    });
  }
}

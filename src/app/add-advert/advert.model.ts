export class AdvertModel {
  advertisementTitle: string;
  advertisementExplanation: string;
  advertisementType: string;
  advertisementAnimal: Animal;
  advertisementAddress:Address;
}

export class Animal {
  genre: string;
  age: number;
  gender: number;
  animalPhotos: string
}

export class Address {
  province: string;
  district: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

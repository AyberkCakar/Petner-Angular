export class AdvertModel {
  advertisementTitle: string;
  advertisementExplanation: string;
  advertisementType: number;
  advertisementAnimal: Animal;
  advertisementAddress:Address;
}

export class Animal {
  genre: string;
  age: number;
  gender: string;
  animalPhotos: Array<string>;
}

export class Address {
  province: string;
  district: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

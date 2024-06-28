export class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { lat: location.latitude, lng: location.longitude }; // {lat: 0.456 , lng: 1.356 }
    this.id = new Date().toString() + Math.random().toString();
  }
}

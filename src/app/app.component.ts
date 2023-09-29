import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


interface Point {
    coordinates: Array<number>;
    type: string;
}

interface Features {
    geometry: Point;
    licence: string;
    query: string;
}

interface Geocoded {
    features: Array<Features>;
    licence: string;
    query: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  address: FormControl  = new FormControl('');
  coords: Array<number> = [0,0];

  constructor(private http: HttpClient) {

  }

  async apiGeocode() {

    let data = await this.http.get<Geocoded>(
      'https://api-adresse.data.gouv.fr/search/?q=' +
      this.address.value +
      '&type=housenumber&autocomplete=0'
    ).toPromise();

    // this.coords = data.features[0].geometry.coordinates;

  }


}

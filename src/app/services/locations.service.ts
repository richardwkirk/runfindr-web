import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country, Region } from '../models/Parkrun';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  runfindrApiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.runfindrApiUrl}/countries`);
  }

  getRegion(region): Observable<Region> {
    return this.http.get<Region>(`${this.runfindrApiUrl}/locations/${region}`);
  }

}

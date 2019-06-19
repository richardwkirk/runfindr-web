import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country, Region } from '../models/Parkrun';
import { Observable } from 'rxjs';
import { RunfindrEnvironmentService } from './runfindr-environment.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService, private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.runfindrEnvironmentService.getApiUrl()}/countries`);
  }

  getRegion(region): Observable<Region> {
    return this.http.get<Region>(`${this.runfindrEnvironmentService.getApiUrl()}/locations/${region}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/parkrun';
import { Observable, BehaviorSubject } from 'rxjs';
import { RunfindrEnvironmentService } from './runfindr-environment.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private countrySource = new BehaviorSubject<Country>(null);
  country = this.countrySource.asObservable();

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService, private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.runfindrEnvironmentService.getApiUrl()}/countries`);
  }

  selectCountry(country): void {
    this.http.get<Country>(`${this.runfindrEnvironmentService.getApiUrl()}/locations/${country}`).subscribe(r => {
      this.countrySource.next(r);
    });
  }

}

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

  private specials = false;

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService, private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.runfindrEnvironmentService.getApiUrl()}/countries`);
  }

  selectCountry(country: string): void {
    let locationUrl = `${this.runfindrEnvironmentService.getApiUrl()}/locations/${country}`;
    if (this.specials) {
      locationUrl += '/special';
    }
    this.http.get<Country>(locationUrl).subscribe(r => {
      this.countrySource.next(r);
    });
  }

  showSpecialEvents() {
    if (!this.specials) {
      this.specials = true;
      const selectedCountry = this.countrySource.value;
      if (selectedCountry) {
        this.selectCountry(selectedCountry.name);
      }
    }
  }

}

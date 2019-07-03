import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country, Region } from '../models/Parkrun';
import { Observable, BehaviorSubject } from 'rxjs';
import { RunfindrEnvironmentService } from './runfindr-environment.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private regionSource = new BehaviorSubject<Region>(null);
  region = this.regionSource.asObservable();

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService, private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.runfindrEnvironmentService.getApiUrl()}/countries`);
  }

  selectRegion(region): void {
    this.http.get<Region>(`${this.runfindrEnvironmentService.getApiUrl()}/locations/${region}`).subscribe(r => {
      this.regionSource.next(r);
    });
  }

}

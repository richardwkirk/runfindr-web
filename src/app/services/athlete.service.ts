import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Athlete } from '../models/Parkrun';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  runfindrApiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getAthlete(athleteId): Observable<Athlete> {
    return this.http.get<Athlete>(`${this.runfindrApiUrl}/athletes/history/${athleteId}`);
  }

}

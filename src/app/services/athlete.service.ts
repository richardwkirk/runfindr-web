import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Athlete } from '../models/Parkrun';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  env = environment;

  runfindrApiUrl = `${this.env.runfindr.server.url}/api`;

  private athleteSource = new BehaviorSubject<Athlete>(null);
  currentAthlete = this.athleteSource.asObservable();

  constructor(private http: HttpClient) { }

  loadAthlete(athleteId: number) {
    this.getAthlete(athleteId).subscribe(athlete => {
      console.log(`Athlete data recieved: ${athlete.name} (${athlete.id})`);
      this.changeAthlete(athlete);
    });
  }

  getAthlete(athleteId): Observable<Athlete> {
    return this.http.get<Athlete>(`${this.runfindrApiUrl}/athletes/history/${athleteId}`);
  }

  changeAthlete(athlete: Athlete) {
    this.athleteSource.next(athlete);
  }
}

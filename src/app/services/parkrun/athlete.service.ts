import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RunfindrEnvironmentService } from '../runfindr-environment.service';
import { Athlete } from 'src/app/models/parkrun/AthleteData';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private athleteSource = new BehaviorSubject<Athlete>(null);
  currentAthlete = this.athleteSource.asObservable();

  private compareAthleteSource = new BehaviorSubject<Athlete[]>([]);
  compareAthletes = this.compareAthleteSource.asObservable();

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService, private http: HttpClient) { }

  loadAthlete(athleteId: number, compare: boolean) {
    this.getAthlete(athleteId).subscribe(athlete => {
      console.log(`Athlete data recieved: ${athlete.name} (${athlete.id})`);
      if (athlete.name !== '') {
        if (!compare) {
          this.changeAthlete(athlete);
        } else {
          this.addCompareAthlete(athlete);
        }
      }
    });
  }

  getAthlete(athleteId): Observable<Athlete> {
    const options = {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    } 
    return this.http.get<Athlete>(`${this.runfindrEnvironmentService.getApiUrl()}/athletes/history/${athleteId}`, options);
  }

  changeAthlete(athlete: Athlete) {
    this.athleteSource.next(athlete);
  }

  addCompareAthlete(athlete: Athlete) {
    this.compareAthleteSource.next(this.compareAthleteSource.value.concat(athlete));
  }

  removeCompareAthlete(athleteId: number) {
    this.compareAthleteSource.next(this.compareAthleteSource.value.filter(a => a.id !== athleteId));
  }

  toggleCompare(doCompare: boolean) {
    if (doCompare) {
      this.compareAthleteSource.next(this.athleteSource.value ? [this.athleteSource.value] : []);
    } else {
      this.compareAthleteSource.next([]);
    }
  }

}

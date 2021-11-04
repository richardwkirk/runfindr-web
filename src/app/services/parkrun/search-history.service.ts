import { Inject, Injectable } from '@angular/core';
import { AthleteService } from 'src/app/services/parkrun/athlete.service';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { AthleteKey } from 'src/app/models/parkrun/AthleteData';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  STORAGE_KEY = 'local_recent_athletes';

  private recentAthletesSource = new BehaviorSubject<AthleteKey[]>([]);
  recentAthletes = this.recentAthletesSource.asObservable();

  recentAthleteCount = 25;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private athleteService: AthleteService) {
    this.recentAthletesSource.next(this.storage.get(this.STORAGE_KEY) || []);

    this.athleteService.currentAthlete.subscribe(athlete => {
      if (athlete) {
        this.updateAthlete(athlete);
      }
    });

    this.athleteService.compareAthletes.subscribe(athletes => {
      if (athletes.length > 0) {
        this.updateAthlete(athletes[athletes.length - 1]);
      }
    });

  }

  updateAthlete(athlete) {
    console.log(`Adding ${athlete.name} to recent athletes list.`);

    // Update from local storage
    let recent = this.storage.get(this.STORAGE_KEY) || [];

    // Add the latest result to the list
    const athleteKey = new AthleteKey(athlete);
    recent = [].concat(athleteKey).concat(recent.filter(a => a.id !== athlete.id).slice(0, this.recentAthleteCount - 1));

    // Store back to local storage
    this.storage.set(this.STORAGE_KEY, recent);

    // Update the published recent sources
    this.recentAthletesSource.next(recent);
  }

}

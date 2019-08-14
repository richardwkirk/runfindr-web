import { Inject, Injectable } from '@angular/core';
import { Card, CardImageDetails } from '../models/Trumps';
import { Athlete } from '../models/Parkrun';
import { ImageDetailsService } from './image-details.service';
import { AthleteService } from './athlete.service';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class TrumpsService {

  static STORAGE_KEY = 'trump_cards';

  private cardSource = new BehaviorSubject<Card[]>([]);
  cards = this.cardSource.asObservable();

  private isListening = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
              private athleteService: AthleteService,
              private imageDetailsService: ImageDetailsService) {

    this.athleteService.currentAthlete.subscribe(athlete => {
      if (this.isListening && athlete) {
        this.addCard(athlete);
      }
    });

    this.loadCards();
  }

  private loadCards() {
    this.cardSource.next(this.storage.get(TrumpsService.STORAGE_KEY) || []);
  }

  private persistCards() {
    this.storage.set(TrumpsService.STORAGE_KEY, this.cardSource.value);
  }

  public startListening() {
    this.isListening = true;
  }

  public stopListening() {
    this.isListening = false;
  }

  private addCard(athlete: Athlete) {
    // Create the new card
    const card = this.createCard(athlete);
    card.imageDetails = this.imageDetailsService.getAthleteImage(athlete.id);

    // Replace any exiting card
    let newCards;
    if (this.cardSource.value.find(c => c.athlete.id === athlete.id)) {
      newCards = this.cardSource.value.map(c => c.athlete.id === athlete.id ? card : c);
    }
    else {
      newCards = this.cardSource.value;
      newCards.push(card);
    }
    this.cardSource.next(newCards);

    this.persistCards();
  }

  public removeCard(athleteId: number) {
    this.cardSource.next(this.cardSource.value.filter(c => c.athlete.id !== athleteId));
    this.persistCards();
  }

  private createCard(athlete: Athlete): Card {
        const card = new Card();

        card.athlete = athlete;

        card.barcodeId = `A${athlete.id}`;

        athlete.results.forEach((r) => {
            ++card.runCount;

            if (!card.eventCounts.hasOwnProperty(r.event)) {
              card.eventCount++;
              card.eventCounts[r.event] = 1;
              card.eventNames.push(r.event);
            } else {
              card.eventCounts[r.event] = card.eventCounts[r.event] + 1;
            }

            if (r.position < card.highestPosition) {
                card.highestPosition = r.position;
                card.highestPositionDetail = `Highest position of ${r.position} achieved first on ${r.date} at ${r.event}`;
            }

            if (r.genderPosition < card.highestGenderPosition) {
                card.highestGenderPosition = r.genderPosition;
                card.highestGenderPositionDetail = `Highest gender position of ${r.genderPosition} achieved first on ${r.date} at ${r.event}`;
            }

            card.eventNumbers[r.runNumber] = (card.eventNumbers[r.runNumber] || 0) + 1;

            if (this.convertTime(r.time) < this.convertTime(card.pb)) {
              card.pb = r.time;
              card.pbDetail = `PB of ${r.time} achieved on ${r.date} at ${r.event}`;
            }

            if (r.ageGrading > card.ageGrading) {
              card.ageGrading = r.ageGrading;
              card.ageGradingDetail = `Age graded PB of ${r.ageGrading} achieved on ${r.date} at ${r.event}`;
            }

            if (!card.firstRun)
            {
              card.firstRun = r.date;
              card.firstRunDetail = `First run completed in ${r.time} on ${r.date} at ${r.event}`;
            }

            card.latestRun = r.date;
            card.latestRunDetail = `Latest run completed in ${r.time} on ${r.date} at ${r.event}`;

        });

        athlete.summaries.forEach((s) => {
            if (s.bestGenderPosition < card.highestGenderPosition) {
              card.highestGenderPosition = s.bestGenderPosition;
              card.highestGenderPositionDetail = `Highest gender position of ${s.bestGenderPosition} achieved at ${s.event}`;
            }
        });


        card.pIndex = this.calculatePIndex(card);
        card.wilsonIndex = this.calculateWilsonIndex(card);

        card.imageDetails = ImageDetailsService.defaultImage;

        card.loadDateTime = new Date().toLocaleString('en-GB');

        return card;
  }

  convertTime(time: string): Date {
    const seconds = parseInt(time.slice(-2), 10);
    const mins = parseInt(time.slice(-5).slice(0, 2), 10);
    const hours = (time.length > 5 ? parseInt(time.slice(0, time.length - 5), 10) : 0);
    return new Date(0, 0, 0, hours, mins, seconds, 0);
  }

  calculatePIndex(card: Card): number {
    const pIndexValues = [];

    card.eventNames.forEach(k => {
        const v = card.eventCounts[k];
        pIndexValues[v] = (pIndexValues[v] || 0) + 1;
    });

    let pIndex = 0;
    let countdown = card.eventCount;
    do {
        pIndex = pIndex + 1;
        countdown = countdown - (pIndexValues[pIndex] || 0);
    } while (countdown > pIndex);

    return pIndex;
  }

  calculateWilsonIndex(card: Card): number {
    for (let i = 1; i < card.eventNumbers.length; ++i) {
        if (!card.eventNumbers[i]) {
            return i - 1;
        }
    }
  }

  setImageFromFacebookProfile(card: Card, profileId: string) {
    const imageDetails = this.imageDetailsService.addFacebookImageForAthlete(card.athlete.id, profileId);
    card.imageDetails = imageDetails;
  }

}

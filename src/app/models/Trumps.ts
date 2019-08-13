import { Athlete } from './Parkrun';
import { ImageDetailsService } from '../services/image-details.service';

export class CardImageDetails {
    facebookId?: string;
    imageUrl?: string;
    text?: string;
}

export class Card {
    athlete: Athlete;
    barcodeId: string;

    pb = '99:99:99';
    pbDetail: string;
    ageGrading = '0%';
    ageGradingDetail: string;
    firstRun: string;
    firstRunDetail: string;
    latestRun: string;
    latestRunDetail: string;
    pIndex = 0;
    wilsonIndex = 0;
    highestPosition = 999999999;
    highestPositionDetail: string;
    highestGenderPosition = 999999999;
    highestGenderPositionDetail: string;
    runCount = 0;
    eventCount = 0;
    eventCounts = {};
    eventNames = [];
    eventNumbers: number[] = [];

    imageDetails: CardImageDetails;

    constructor(athlete: Athlete) {
        this.athlete = athlete;

        this.barcodeId = `A${athlete.id}`;

        athlete.results.forEach((r) => {
            ++this.runCount;

            if (!this.eventCounts.hasOwnProperty(r.event)) {
              this.eventCount++;
              this.eventCounts[r.event] = 1;
              this.eventNames.push(r.event);
            } else {
              this.eventCounts[r.event] = this.eventCounts[r.event] + 1;
            }

            if (r.position < this.highestPosition) {
                this.highestPosition = r.position;
                this.highestPositionDetail = `Highest position of ${r.position} achieved first on ${r.date} at ${r.event}`;
            }

            if (r.genderPosition < this.highestGenderPosition) {
                this.highestGenderPosition = r.genderPosition;
                this.highestGenderPositionDetail = `Highest gender position of ${r.genderPosition} achieved first on ${r.date} at ${r.event}`;
            }

            this.eventNumbers[r.runNumber] = (this.eventNumbers[r.runNumber] || 0) + 1;

            if (this.convertTime(r.time) < this.convertTime(this.pb)) {
                this.pb = r.time;
                this.pbDetail = `PB of ${r.time} achieved on ${r.date} at ${r.event}`;
            }

            if (r.ageGrading > this.ageGrading) {
                this.ageGrading = r.ageGrading;
                this.ageGradingDetail = `Age graded PB of ${r.ageGrading} achieved on ${r.date} at ${r.event}`;
            }

            if (!this.firstRun)
            {
                this.firstRun = r.date;
                this.firstRunDetail = `First run completed in ${r.time} on ${r.date} at ${r.event}`;
            }

            this.latestRun = r.date;
            this.latestRunDetail = `Latest run completed in ${r.time} on ${r.date} at ${r.event}`;

        });

        this.pIndex = this.calculatePIndex();
        this.wilsonIndex = this.calculateWilsonIndex();

        this.imageDetails = ImageDetailsService.defaultImage;
    }

    convertTime(time: string): Date {
        const seconds = parseInt(time.slice(-2), 10);
        const mins = parseInt(time.slice(-5).slice(0, 2), 10);
        const hours = (time.length > 5 ? parseInt(time.slice(0, time.length - 5), 10) : 0);
        return new Date(0, 0, 0, hours, mins, seconds, 0);
    }

    calculatePIndex(): number {
        const pIndexValues = [];

        this.eventNames.forEach(k => {
            const v = this.eventCounts[k];
            pIndexValues[v] = (pIndexValues[v] || 0) + 1;
        });

        let pIndex = 0;
        let countdown = this.eventCount;
        do {
            pIndex = pIndex + 1;
            countdown = countdown - (pIndexValues[pIndex] || 0);
        } while (countdown > pIndex);

        return pIndex;
    }

    calculateWilsonIndex(): number {
        for (let i = 1; i < this.eventNumbers.length; ++i) {
            if (!this.eventNumbers[i]) {
                return i - 1;
            }
        }
    }
}


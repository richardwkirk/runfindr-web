import { Athlete } from './Parkrun';

export class Card {
    athlete: Athlete;
    barcodeId: string;
    pb = '99:99:99';
    ageGrading = '0%';
    firstRun: string;
    pIndex = 0;
    wilsonIndex = 0;
    highestPosition = 999999999;
    runCount = 0;
    eventCount = 0;
    eventCounts = {};
    eventNames = [];
    eventNumbers: number[] = [];

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
            }

            this.eventNumbers[r.runNumber] = (this.eventNumbers[r.runNumber] || 0) + 1;

            if (this.convertTime(r.time) < this.convertTime(this.pb)) {
                this.pb = r.time;
            }

            if (r.ageGrading > this.ageGrading) {
                this.ageGrading = r.ageGrading;
            }

            this.firstRun = r.date;
        });

        this.pIndex = this.calculatePIndex();
        this.wilsonIndex = this.calculateWilsonIndex();
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


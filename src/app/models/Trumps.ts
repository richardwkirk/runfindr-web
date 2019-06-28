import { Athlete } from './Parkrun';

export class Card {
    athlete: Athlete;
    barcodeId: string;
    pb = '99:99';
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

            if (r.time < this.pb) {
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


    calculatePIndex() : number {
        const pIndexValues = [];

        this.eventNames.forEach(k => {
            const v = this.eventCounts[k];
            pIndexValues[v] = (pIndexValues[v] || 0) + 1;
        });

        let countdown = this.eventCount;
        for (let i = 1; i < pIndexValues.length; ++i) {
            if (countdown >= i) {
                countdown = countdown - (pIndexValues[i] || 0);
            } else {
                return i - 1;
            }
        }

        return 0;
    }

    calculateWilsonIndex() : number {
        for (let i = 1; i < this.eventNumbers.length; ++i) {
            if (!this.eventNumbers[i]) {
                return i - 1;
            }
        }
    }

}
import { Athlete } from './Parkrun';

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

    constructor() {}

}


export class Result {
    event: string;
    date: string;
    runNumber: number;
    position: number;
    genderPosition: number;
    time: string;
    ageGrading: string;
}

export class Summary {
    event: string;
    runs: number;
    bestGenderPosition: number;
    bestPosition: number;
    bestTime: string;
}

export class AthleteKey {
    name: string;
    id: number;

    constructor(athlete: Athlete) {
        this.id = athlete.id;
        this.name = athlete.name;
    }
}

export class Athlete {
    name: string;
    id: number;
    results: Result[];
    summaries: Summary[];
}


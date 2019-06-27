export class Location {
    lat: number;
    long: number;
    zoom: number;
}

export class Country {
    name: string;
    location: Location;
    url: string;
}

export class Event {
    name: string;
    shortname: string;
    location: Location;
    url: string;
}

export class Region {
    name: string;
    location: Location;
    regions: Region[];
    events: Event[];
    url: string;

    static allEvents(region): Event[] {
        const allEvents = region.regions.map(r => Region.allEvents(r)).concat(region.events);
        const flatEvents = [].concat.apply([], allEvents);
        return flatEvents;
    }
}

export class Result {
    event: string;
    date: string;
    runNumber: number;
    position: number;
    time: string;
    ageGrading: string;
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
}


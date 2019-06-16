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

export class Region {
    name: string;
    location: Location;
    regions: Region[];
    events: Event[];
    url: string;
}

export class Event {
    name: string;
    shortname: string;
    location: Location;
    url: string;
}



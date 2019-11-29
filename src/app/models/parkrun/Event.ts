import { Location } from './Location';

export interface SpecialEventTimes {

    extra: string;

    newyear: string;

}

export interface Event {

    eventName: string;

    shortName: string;

    longName: string;

    id: number;

    locationName: string;

    location: Location;

    url: string;

    specialEventTimes?: SpecialEventTimes;

}


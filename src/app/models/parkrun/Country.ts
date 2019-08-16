import { Event } from "./Event";
import { Location } from "./Location";

export interface Country {

    name: string;

    countryCode: number;

    bounds?: {
        east: number,
        north: number,
        south: number,
        west: number
    };

    events?: Event[];

    url: string;

}

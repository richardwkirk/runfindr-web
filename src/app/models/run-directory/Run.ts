import { RunfindrDomainObject } from '../RunfindrDomainObject';

export interface Run extends RunfindrDomainObject
{
    name: string;
   
    description: string;

    start_dt: Date;

    location: string;

    lat_lng: { lat: number, lng: number};

    route_url: string;

    dist: number;

    dist_units: string;

    target_time: string;

    capacity: number;

    leader: string;
}

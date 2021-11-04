import { RunfindrDomainObject } from '../RunfindrDomainObject';

export interface Club extends RunfindrDomainObject
{
    name: string;
   
    location: string;

    lat_lng: { lat: number, lng: number};

    url: string;

    image_url: string;

    short_desc: string;

    long_desc: string;

    admins: string[];

    members: string[];
}
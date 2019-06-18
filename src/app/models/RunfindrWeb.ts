import { Region, Event, Athlete } from './Parkrun';

export enum VisitType {
    NotVisited = 0,
    Primary = 1,
    Secondary = 2
}

export class Marker {
    lat: number;
    long: number;
    title: string;
    iconUrl: string;
    visited: boolean;
    visitType: VisitType;
    priority = 1;
    url: string;

    setVisitSpecificAttributes() {
        if (this.visitType === (VisitType.Primary | VisitType.Secondary)) {
            this.iconUrl = '/assets/event_visited_both_balloon.png';
            this.priority = 9;
        }
        if ((this.visitType & VisitType.Primary) != 0) {
            this.iconUrl = '/assets/event_visited_balloon.png';
            this.priority = 9;
        }
        if ((this.visitType & VisitType.Secondary) != 0) {
            this.iconUrl = '/assets/event_visited_other_balloon.png';
            this.priority = 5
        }
        this.iconUrl = '/assets/event_balloon.png';
        this.priority = 1;
    }

    setVisited(visitType: VisitType) {
        this.visitType |= visitType;
        this.visited = this.visitType !== VisitType.NotVisited;
        this.setVisitSpecificAttributes();
    }
}

export class MarkerSet {
    markers: Marker[] = [];

    clearMarkers() {
        this.markers.forEach(m => {
            m.visitType = VisitType.NotVisited;
            m.setVisited(VisitType.NotVisited);
        });
    }

    createMarkers(region: Region): MarkerSet {
        const markerSet = new MarkerSet();
        markerSet.markers = this.allEvents(region).map(e => this.createEventMarker(e));
        return markerSet;
    }

    allEvents(region: Region): Event[] {
        const allEvents = region.regions.map(r => this.allEvents(r)).concat(region.events);
        const flatEvents = [].concat.apply([], allEvents);
        return flatEvents;
    }

    createEventMarker(e: Event): Marker {
        const marker = new Marker();
        marker.lat = e.location.lat;
        marker.long = e.location.long;
        marker.title = e.name;
        marker.url = e.url;
        marker.setVisited(VisitType.NotVisited);
        return marker;
    }
}
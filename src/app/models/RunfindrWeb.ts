import { Region, Event, AthleteKey, Athlete, Result } from './Parkrun';

export enum VisitType {
    NotVisited = 0,
    Primary = 1,
    Secondary = 2
}

export class Visitor {
    athlete: AthleteKey;
    visits: Result[] = [];

    constructor(athlete: AthleteKey) {
        this.athlete = athlete;
    }

    addResult(result: Result) {
        this.visits.push(result);
    }

    firstVisit() {
        if (this.visits.length !== 0) {
            return this.visits[this.visits.length - 1].date;
        }
        return 'never';
    }

    pb() {
        if (this.visits.length !== 0) {
            return this.visits.reduce((min, r) => r.time < min ? r.time : min, this.visits[0].time);
        }
        return 'no run';
    }
}

export class MappedEvent {
    event: Event;
    iconUrl = '/assets/event_balloon.png';
    visited: boolean;
    visitType: VisitType;
    priority = 1;
    visitors = {};

    setVisitSpecificAttributes() {
        if (this.visitType === (VisitType.Primary | VisitType.Secondary)) {
            this.iconUrl = '/assets/event_visited_both_balloon.png';
            this.priority = 9;
            return;
        }
        if ((this.visitType & VisitType.Primary) !== 0) {
            this.iconUrl = '/assets/event_visited_balloon.png';
            this.priority = 9;
            return;
        }
        if ((this.visitType & VisitType.Secondary) !== 0) {
            this.iconUrl = '/assets/event_visited_other_balloon.png';
            this.priority = 5;
            return;
        }
        this.iconUrl = '/assets/event_balloon.png';
        this.priority = 1;
    }

    private setVisited(visitType: VisitType) {
        this.visitType |= visitType;
        this.visited = this.visitType !== VisitType.NotVisited;
        this.setVisitSpecificAttributes();
    }

    clearVisits() {
        this.visitType = VisitType.NotVisited;
        this.visited = false;
        this.visitors = [];
        this.setVisitSpecificAttributes();
    }

    addVisit(athlete: Athlete, result: Result, isPrimary: boolean) {
        this.setVisited(isPrimary ? VisitType.Primary : VisitType.Secondary);
        if (!this.visitors.hasOwnProperty(athlete.id)) {
            this.visitors[athlete.id] = new Visitor(athlete);
        }
        this.visitors[athlete.id].addResult(result);
    }
}

export class MappedEventHelper {

    static createMappedEvents(region: Region): MappedEvent[] {
        return Region.allEvents(region).map(e => this.createEventMarker(e));
    }

    static createEventMarker(e: Event): MappedEvent {
        const marker = new MappedEvent();
        marker.event = e;
        return marker;
    }

    static clearMarkers(events: MappedEvent[]) {
        events.forEach(m => {
            m.visitType = VisitType.NotVisited;
            m.clearVisits();
        });
    }
}


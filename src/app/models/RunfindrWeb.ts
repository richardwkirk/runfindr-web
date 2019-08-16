import { Event, AthleteKey, Athlete, Result, Country } from './parkrun';
import { SafeMethodCall } from '@angular/compiler';

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
            return this.visits[0].date;
        }
        return 'never';
    }

    firstVisitDate() {
        const firstDateStr = this.firstVisit();
        if (firstDateStr !== 'never') {
            const year = parseInt(firstDateStr.substring(6, 10), 10);
            const month = parseInt(firstDateStr.substring(3, 5), 10);
            const day = parseInt(firstDateStr.substring(0, 2), 10);
            return new Date(year, month, day);
        }
        return null;
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
    order: string = null;
    label: any;

    createLabel() {
        if (this.order) {
            this.label = {color: 'white', fontFamily: 'courier', fontSize: 'x-small', fontWeight: 'bold', text: this.order};
        }
        else {
            this.label = null;
        }
    }

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
        this.order = null;
        this.label = null;
        this.setVisitSpecificAttributes();
    }

    addVisit(athlete: Athlete, result: Result, isPrimary: boolean, order?: number) {
        this.setVisited(isPrimary ? VisitType.Primary : VisitType.Secondary);
        if (!this.visitors.hasOwnProperty(athlete.id)) {
            this.visitors[athlete.id] = new Visitor(athlete);
        }
        if (isPrimary) {
            this.order = order ? String(order) : null;
            this.createLabel();
        }
        this.visitors[athlete.id].addResult(result);
    }
}

export class MappedEventHelper {

    static createMappedEvents(country: Country): MappedEvent[] {
        return country.events.map(e => this.createEventMarker(e));
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


import { Event, AthleteKey, Athlete, Result, Country } from './parkrun';
import { MapSettings } from './MapSettings';

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
    hidden = false;

    constructor(private mapSettings: MapSettings) {}

    createLabel() {
        if (this.mapSettings.showAlphabet) {
            this.label = {color: 'white', fontFamily: 'courier', fontSize: 'x-small', fontWeight: 'bold', text: this.event.shortName.substr(0, 1)};
        }
        else if (this.order) {
            this.label = {color: 'black', fontFamily: 'courier', fontSize: 'small', fontWeight: 'bold', text: this.order};
        }
        else {
            this.label = null;
        }
    }

    setVisitSpecificAttributes() {
        this.iconUrl = null;
        if (this.event.specialEventTimes && this.mapSettings) {
            this.handleSpecialEvents();
        }

        if (this.visitType === (VisitType.Primary | VisitType.Secondary)) {
            this.iconUrl = '/assets/event_visited_both_balloon.png';
            this.priority = 9;
        }
        else if ((this.visitType & VisitType.Primary) !== 0) {
            this.iconUrl = '/assets/event_visited_balloon.png';
            this.priority = 9;
        }
        else if ((this.visitType & VisitType.Secondary) !== 0) {
            this.iconUrl = '/assets/event_visited_other_balloon.png';
            this.priority = 5;
        }
        else if (this.mapSettings.showAlphabet) {
            this.iconUrl = '/assets/event_balloon_blank.png';
            this.priority = 1;
        }

        if (this.mapSettings.showCancellations && MappedEventHelper.isCancelled(this.event)) {
            this.iconUrl = '/assets/event_cancelled_balloon.png';
            this.priority = 2;
        }

        if (!this.iconUrl) {
            this.iconUrl = '/assets/event_balloon.png';
            this.priority = 1;
        }
    }

    private handleSpecialEvents() {
        let startTime = null;
        switch (this.mapSettings.specialEvent)
        {
            case 'none':
                return;
            case 'extra':
                startTime = this.event.specialEventTimes.extra;
                break;
            case 'newyear':
                startTime = this.event.specialEventTimes.newyear;
                break;
        }

        if (!startTime || startTime === 'None') {
            this.hidden = true;
        }
        else if (startTime.length > 2) {
            switch (startTime.substring(0, 2)) {
                case '07':
                case '08':
                case '09':
                case '10':
                case '11':
                    this.iconUrl = `/assets/event_balloon_special_${startTime.substring(0, 2)}.png`;
                    this.priority = 30;
            }
        }
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
        this.hidden = false;
        this.createLabel();
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

    static createMappedEvents(country: Country, settings: MapSettings): MappedEvent[] {
        return country.events.map(e => this.createEventMarker(e, settings));
    }

    static createEventMarker(e: Event, settings: MapSettings): MappedEvent {
        const marker = new MappedEvent(settings);
        marker.event = e;
        return marker;
    }

    static clearMarkers(events: MappedEvent[]) {
        events.forEach(m => {
            m.visitType = VisitType.NotVisited;
            m.clearVisits();
        });
    }

    static isCancelled(event: Event) {
        if (event.cancellations && event.cancellations.length > 0) {
            const nextWeekDate = new Date(new Date(Date.now()));
            nextWeekDate.setDate(nextWeekDate.getDate() + 6);
            if (new Date(Date.parse(event.cancellations[0].date)) <= nextWeekDate) {
                return true;
            }
        }
        return false;
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { LatLngBoundsLiteral } from '@agm/core';
import { MappedEvent, MappedEventHelper } from 'src/app/models/RunfindrWeb';
import { Athlete, Result, Country } from 'src/app/models/parkrun';
import { MapSettings } from 'src/app/models/MapSettings';

@Component({
  selector: 'app-agm-container',
  templateUrl: './agm-container.component.html',
  styleUrls: ['./agm-container.component.css']
})
export class AgmContainerComponent implements OnInit {

  private _selectedCountry: Country;
  private _athlete: Athlete;
  private _compareAthletes: Athlete[];
  private _settings: MapSettings;

  @Input()
  set selectedCountry(country: Country) {
    this._selectedCountry = country;
    this.updateMap();
  }

  get selectedCountry(): Country { return this._selectedCountry; }


  @Input()
  set athlete(athlete: Athlete) {
    this._athlete = athlete;
    if (this.map) {
      this.setVisitedMarkers();
    }
  }

  get athlete(): Athlete { return this._athlete; }

  @Input()
  set compareAthletes(athletes: Athlete[]) {
    this._compareAthletes = athletes;
    if (this.map) {
      this.setVisitedMarkers();
    }
  }

  get compareAthletes(): Athlete[] { return this._compareAthletes; }

  @Input()
  set mapSettings(settings: MapSettings) {
    console.log('Applying settings to map.');
    this._settings = settings;
    if (this.map) {
      this.setVisitedMarkers();
    }
  }

  get mapSettings(): MapSettings { return this._settings; }

  mappedEvents: MappedEvent[] = [];

  map: any;

  bounds: LatLngBoundsLiteral | boolean = false;

  // Default location is bushy parkrun
  initialLatitude = 51.410992;
  initialLongitude = -0.335791;
  initialZoom = 2;

  constructor() { }

  ngOnInit() {
  }

  mapReady(map) {
    this.map = map;
    this.updateMap();
  }

  updateMap() {

    if (this.map && this.selectedCountry !== null) {
      console.log(`Update map with new region data for ${this.selectedCountry.name}`);

      if (this.selectedCountry.bounds) {
        this.bounds = {
                east: this.selectedCountry.bounds.east,
                north: this.selectedCountry.bounds.north,
                south: this.selectedCountry.bounds.south,
                west: this.selectedCountry.bounds.west
              };
      }
      else {
        this.map.panTo({ lat: this.initialLatitude, lng: this.initialLongitude });
        this.map.setZoom(this.initialZoom);
      }

      this.mappedEvents = MappedEventHelper.createMappedEvents(this.selectedCountry, this.mapSettings);
      this.setVisitedMarkers();
    }
  }

  visibleEvents() {
    return this.mappedEvents.filter(e => !e.hidden);
  }

  setVisitedMarkers() {
    MappedEventHelper.clearMarkers(this.mappedEvents);
    if (this.mapSettings.showTogetherness && this.compareAthletes.length > 0) {
      this.setVisitedMarkersForAthletesTogether(this.compareAthletes);
    } else if (this.compareAthletes.length > 0) {
      this.setVisitedMarkersForAthlete(this.compareAthletes[0], true);
      this.compareAthletes.slice(1).forEach(a => this.setVisitedMarkersForAthlete(a, false));
    } else if (this.athlete) {
      this.setVisitedMarkersForAthlete(this.athlete, true);
    }

    this.updateAlphabetMarkers();
  }
  
  private updateAlphabetMarkers() {
    if (!this.mapSettings.showAlphabet) return;

    const visitedAlphabet = new Set();
    for (const athlete of [...(this.compareAthletes || []), this.athlete]) {
      athlete.results.forEach((r) => visitedAlphabet.add(r.event.substr(0, 1)));
    }

    for (const mappedEvent of this.mappedEvents || []) {
      if (!mappedEvent.visited && visitedAlphabet.has(mappedEvent.event.shortName.substr(0, 1))) {
        mappedEvent.hidden = true;
      }
    }

  }

  setVisitedMarkersForAthletesTogether(athletes: Athlete[]) {
    let order = 0;
    const visitedEventOrder = {};

    const matchedResults = this.getMatchedResults(athletes);
    matchedResults.forEach(r => {
      if (!visitedEventOrder[r[0].event]) {
        visitedEventOrder[r[0].event] = ++order;
      }
      for (let i = 0; i < athletes.length; ++i) {
        this.setVisitedEvent(athletes[i], r[i], true, this.mapSettings.showOrder ? visitedEventOrder[r[i].event] : null);
      }
    });
  }

  getMatchedResults(athletes: Athlete[]) {
    if (athletes.length < 1) {
      return [];
    }

    const matchedResults = [];

    athletes[0].results.forEach(r => {
      const matchedRuns = [];
      athletes.forEach(a =>  {
        const match = a.results.find(m => m.event === r.event && m.runNumber === r.runNumber);
        if (match) {
          matchedRuns.push(match);
        }
        else {
          return;
        }
      });
      if (matchedRuns.length === athletes.length) {
        matchedResults.push(matchedRuns);
      }
    });
    return matchedResults;
  }

  setVisitedMarkersForAthlete(athlete: Athlete, isPrimary: boolean) { 
    let order = 0;
    const visitedEventOrder = {};
    athlete.results.forEach(r => {
      if (!visitedEventOrder[r.event]) {
        visitedEventOrder[r.event] = ++order;
      }
      this.setVisitedEvent(athlete, r, isPrimary, this.mapSettings.showOrder ? visitedEventOrder[r.event] : null);
    });
  }

  setVisitedEvent(athlete: Athlete, result: Result, isPrimary: boolean, order: number) {
    if (this.mappedEvents) {
      this.mappedEvents.filter(m => m.event.shortName === result.event).forEach(m => {
        m.addVisit(athlete, result, isPrimary, order);
      });
    }
  }

  eventSelected(mappedEvent) {
    console.log(mappedEvent);
  }

}

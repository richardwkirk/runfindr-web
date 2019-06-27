import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { AthleteService } from '../../services/athlete.service';
import { MappedEvent, MappedEventHelper, Visitor } from '../../models/RunfindrWeb';
import { Region, Athlete, Result } from '../../models/Parkrun';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  protected map: any;

  selectedCountry = 'World';

  mappedEvents: MappedEvent[] = [];

  athlete: Athlete;
  compareAthletes: Athlete[];

  // Default location is bushy parkrun
  initialLatitude = 51.410992;
  initialLongitude = -0.335791;
  initialZoom = 2;

  lat = 51.410992;
  lng = -0.335791;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private athleteService: AthleteService) { }

  mapReady(map) {
    this.map = map;
    this.updateMap();
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.updateCountry(params.region ? params.region : 'World');
      if (params.athleteId) {
        this.athleteService.loadAthlete(params.athleteId, false);
      }
    });

    this.athleteService.currentAthlete.subscribe(athlete => {
      if (athlete) {
        this.updateAthlete(athlete);
      }
    });

    this.athleteService.compareAthletes.subscribe(athletes => {
      this.updateCompareAthletes(athletes);
    });
  }

  updateCountry(country: string) {
    this.selectedCountry = country;
    console.log(`Country set to ${this.selectedCountry}`);

    this.updateCountryName();
    if (this.map) {
      this.updateMap();
    }
  }

  updateCountryName() {
    const regionNameSpan = document.getElementById('regionName');
    regionNameSpan.innerHTML = this.selectedCountry;
  }

  updateMap() {
    this.locationService.getRegion(this.selectedCountry).subscribe((region: Region) => {
      console.log(`Update map with new region data for ${region.name}`);

      // This should not be needed once we have all the markers
      this.lat = region.location.lat;
      this.lng = region.location.long;
      console.log(`Showing ${this.selectedCountry} center as ${this.lat}/${this.lng}`);

      if (this.map) {
        if (region.name !== 'World') {
          this.map.panTo({ lat: region.location.lat, lng: region.location.long });
        }
        console.log(`Setting zoom to ${region.location.zoom}`);
        this.map.setZoom(Math.max(region.location.zoom, 2));
      }

      this.mappedEvents = MappedEventHelper.createMappedEvents(region);
      this.setVisitedMarkers();
    });
  }

  updateAthlete(athlete: Athlete) {
    this.athlete = athlete;

    const athleteNameSpan = document.getElementById('athleteName');
    athleteNameSpan.innerHTML = String(athlete.name);

    if (this.map) {
      this.setVisitedMarkers();
    }
  }

  updateCompareAthletes(compareAthletes: Athlete[]) {
    this.compareAthletes = compareAthletes;
    this.setVisitedMarkers();
  }

  setVisitedMarkers() {
    MappedEventHelper.clearMarkers(this.mappedEvents);
    if (this.compareAthletes.length > 0) {
      this.setVisitedMarkersForAthlete(this.compareAthletes[0], true);
      this.compareAthletes.slice(1).forEach(a => this.setVisitedMarkersForAthlete(a, false));
    } else if (this.athlete) {
      this.setVisitedMarkersForAthlete(this.athlete, true);
    }
  }

  setVisitedMarkersForAthlete(athlete: Athlete, isPrimary: boolean) {
    athlete.results.forEach(r => this.setVisitedEvent(athlete, r, isPrimary));
  }

  setVisitedEvent(athlete: Athlete, result: Result, isPrimary: boolean) {
    if (this.mappedEvents) {
      this.mappedEvents.filter(m => m.event.name === result.event).forEach(m => m.addVisit(athlete, result, isPrimary));
    }
  }

  eventSelected(mappedEvent) {
    console.log(mappedEvent);
  }

  firstVisitOrder = (a: KeyValue<number, Visitor>, b: KeyValue<number, Visitor>): number => {
    return a.value.firstVisitDate() < b.value.firstVisitDate() ? -1 : (b.value.firstVisitDate() < a.value.firstVisitDate() ? 1 : 0);
  }
}

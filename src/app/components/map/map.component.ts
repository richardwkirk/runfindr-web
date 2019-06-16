import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { AthleteService } from '../../services/athlete.service';
import { Marker } from '../../models/RunfindrWeb';
import { Region, Event, Athlete } from '../../models/Parkrun';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  protected map: any;

  selectedCountry = 'World';

  markers: Marker[];

  athlete: Athlete;

  // Default location is bushy parkrun
  initialLatitude = 51.410992;
  iniitialLongitude = -0.335791;
  initialZoom = 2;

  lat = 51.410992;
  lng = -0.335791;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private athleteService: AthleteService) { }

  protected mapReady(map) {
    this.map = map;
    this.updateMap();
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.updateCountry(params.region ? params.region : 'World');
      if (params.athleteId) {
        this.updateAthlete(params.athleteId);
      }
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
    this.locationService.getRegion(this.selectedCountry).subscribe(region => {
      console.log(`Update map with new region data for ${region.name}`);
      // This should not be needed once we have all the markers
      this.lat = region.location.lat;
      this.lng = region.location.long;
      console.log(`Showing ${this.selectedCountry} center as ${this.lat}/${this.lng}`);

      if (this.map) {
        this.map.panTo({ lat: region.location.lat, lng: region.location.long });
        console.log(`Setting zoom to ${region.location.zoom}`);
        this.map.setZoom(Math.max(region.location.zoom, 2));
      }

      const markers = this.createMarkers(region);
      if (this.athlete) {
        this.setVisitedMarkers(markers, this.athlete);
      }
      this.markers = markers;
    });
  }

  createMarkers(region: Region): Marker[] {
    return this.allEvents(region).map(e => this.createEventMarker(e));
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
    marker.setVisited(false);
    return marker;
  }

  updateAthlete(athleteId: number) {
    this.athleteService.getAthlete(athleteId).subscribe(athlete => {
      console.log(`Athlete data recieved: ${athlete.name} (${athlete.id})`);
      this.athlete = athlete;

      const athleteNameSpan = document.getElementById('athleteName');
      athleteNameSpan.innerHTML = String(athlete.name);

      if (this.map) {
        this.setVisitedMarkers(this.markers, athlete);
      }
    });
  }

  setVisitedMarkers(markers: Marker[], athlete: Athlete) {
    athlete.results.forEach(r => this.setVisitedEvent(markers, r.event));
  }

  setVisitedEvent(markers: Marker[], eventName: string) {
    if (markers) {
      markers.filter(m => m.title === eventName).forEach(m => m.setVisited(true));
    }
  }

}

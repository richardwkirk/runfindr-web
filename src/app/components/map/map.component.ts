import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService} from '../../services/locations.service';
import { Marker } from '../../models/RunfindrWeb';
import { Region, Event } from '../../models/Parkrun';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  protected map: any;

  selectedCountry = 'World';

  markers: Marker[];

  // Default location is bushy parkrun
  initialLatitude = 51.410992;
  iniitialLongitude = -0.335791;
  initialZoom = 2;

  lat = 51.410992;
  lng = -0.335791;

  constructor(private route: ActivatedRoute, private locationsService: LocationsService) { }

  protected mapReady(map) {
    this.map = map;
    this.updateMap();
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.updateCountry(params.region ? params.region : 'World');
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
    this.locationsService.getRegion(this.selectedCountry).subscribe(region => {

      // This should not be needed once we have all the markers
      this.lat = region.location.lat;
      this.lng = region.location.long;
      console.log(`Showing ${this.selectedCountry} center as ${this.lat}/${this.lng}`);

      if (this.map) {
        this.map.panTo({ lat: region.location.lat, lng: region.location.long });
        console.log(`Setting zoom to ${region.location.zoom}`);
        this.map.setZoom(Math.max(region.location.zoom, 2));
      }

      this.markers = this.createMarkers(region);
    });
  }

  createMarkers(region: Region): Marker[] {
    return this.allEvents(region).map(e => this.createEventMarker(e));
  }

  allEvents(region: Region): Event[] {
    let allEvents = region.regions.map(r => this.allEvents(r)).concat(region.events);
    let flatEvents = [].concat.apply([], allEvents);
    return flatEvents;
}

  createEventMarker(e: Event): Marker {
    console.log(e);
    return {
      lat: e.location.lat,
      long: e.location.long,
      title: e.name,
      iconUrl: '/assets/event_balloon.png',
    };
  }

}

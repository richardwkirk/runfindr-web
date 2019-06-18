import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { AthleteService } from '../../services/athlete.service';
import { Marker, MarkerSet, VisitType } from '../../models/RunfindrWeb';
import { Region, Event, Athlete } from '../../models/Parkrun';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  protected map: any;

  selectedCountry = 'World';

  markerSet: MarkerSet = new MarkerSet();

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
    this.locationService.getRegion(this.selectedCountry).subscribe(region => {
      console.log(`Update map with new region data for ${region.name}`);
      // This should not be needed once we have all the markers
      this.lat = region.location.lat;
      this.lng = region.location.long;
      console.log(`Showing ${this.selectedCountry} center as ${this.lat}/${this.lng}`);

      if (this.map) {
        if (region.name !== "World") {
          this.map.panTo({ lat: region.location.lat, lng: region.location.long });
        }
        console.log(`Setting zoom to ${region.location.zoom}`);
        this.map.setZoom(Math.max(region.location.zoom, 2));
      }

      this.markerSet = this.markerSet.createMarkers(region);
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
    this.markerSet.clearMarkers();
    if (this.compareAthletes.length > 0) {
      this.setVisitedMarkersForAthlete(this.compareAthletes[0], VisitType.Primary);
      this.compareAthletes.slice(1).forEach(a => this.setVisitedMarkersForAthlete(a, VisitType.Secondary));
    }
    else if (this.athlete) {
      this.setVisitedMarkersForAthlete(this.athlete, VisitType.Primary);
    }
  }

  setVisitedMarkersForAthlete(athlete: Athlete, visitType: VisitType) {
    athlete.results.forEach(r => this.setVisitedEvent(r.event, visitType));
  }

  setVisitedEvent(eventName: string, visitType: VisitType) {
    if (this.markerSet) {
      this.markerSet.markers.filter(m => m.title === eventName).forEach(m => m.setVisited(visitType));
    }
  }

  markerClicked(marker) {
    console.log(marker);
  }
}

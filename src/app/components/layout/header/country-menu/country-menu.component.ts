import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../models/parkrun';
import { LocationService} from '../../../../services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-menu',
  templateUrl: './country-menu.component.html',
  styleUrls: ['./country-menu.component.css']
})
export class CountryMenuComponent implements OnInit {

  selectedCountry = 'World';

  countries: Country[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.country.subscribe( c => {
      if (c != null) {
        this.selectedCountry = c.name;
      }
    });
    

    this.locationService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../models/Parkrun';
import { LocationService} from '../../../../services/location.service';

@Component({
  selector: 'app-country-menu',
  templateUrl: './country-menu.component.html',
  styleUrls: ['./country-menu.component.css']
})
export class CountryMenuComponent implements OnInit {

  countries: Country[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

}

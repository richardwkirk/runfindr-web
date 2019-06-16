import { Component, OnInit } from '@angular/core';
import { Country } from '../../../../models/Parkrun';
import { LocationsService} from '../../../../services/locations.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries: Country[];

  constructor(private locationsService: LocationsService) { }

  ngOnInit() {
    this.locationsService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

}

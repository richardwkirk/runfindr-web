import { Component, OnInit } from '@angular/core';
import { MenuContext } from '../LayoutOptions';
import { LayoutService } from 'src/app/services/layout.service';
import { Icons } from '../Icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showCountries = false;
  showAthletes = false;

  worldIcon = Icons.World;
  ukIcon = Icons.Uk;
  trumpsIcon = Icons.Trumps;
  christmasIcon = Icons.Christmas;
  newYearIcon = Icons.NewYear;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.menuContext.subscribe(context => {
      this.showCountries = context != null ? context.indexOf(MenuContext.Countries) > -1 : false;
      this.showAthletes = context != null ? context.indexOf(MenuContext.Athletes) > -1 : false;
    });

  }

}

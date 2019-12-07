import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../../layout/LayoutOptions';
import { Icons } from '../../layout/Icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  worldIcon = Icons.World;
  ukIcon = Icons.Uk;
  trumpsIcon = Icons.Trumps;
  christmasIcon = Icons.Christmas;
  newYearIcon = Icons.NewYear;

  constructor(private layoutService: LayoutService) {
    layoutService.setMenuContext([MenuContext.Countries]);
  }

  ngOnInit() {
  }

}

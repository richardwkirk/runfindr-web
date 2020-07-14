import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/components/layout/Icons';

@Component({
  selector: 'app-parkrun',
  templateUrl: './parkrun.component.html',
  styleUrls: ['./parkrun.component.css']
})
export class ParkrunComponent implements OnInit {

  worldIcon = Icons.World;
  ukIcon = Icons.Uk;
  trumpsIcon = Icons.Trumps;
  christmasIcon = Icons.Christmas;
  newYearIcon = Icons.NewYear;
  
  constructor() { }

  ngOnInit() {
  }

}

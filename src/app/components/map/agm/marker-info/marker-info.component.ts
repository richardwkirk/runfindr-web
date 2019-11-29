import { Component, OnInit, Input } from '@angular/core';
import { MappedEvent } from 'src/app/models/RunfindrWeb';
import { Country } from 'src/app/models/parkrun';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.css']
})
export class MarkerInfoComponent implements OnInit {

  @Input() mappedEvent: MappedEvent;

  @Input() country: Country;

  constructor() { }

  ngOnInit() {
  }

}

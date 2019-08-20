import { Component, OnInit, Input } from '@angular/core';
import { MappedEvent } from 'src/app/models/RunfindrWeb';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.css']
})
export class MarkerInfoComponent implements OnInit {

  @Input() mappedEvent: MappedEvent;

  constructor() { }

  ngOnInit() {
  }

}

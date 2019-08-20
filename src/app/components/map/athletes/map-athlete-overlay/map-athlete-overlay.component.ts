import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/Trumps';
import { TrumpsService } from 'src/app/services/trumps.service';
import { Athlete } from 'src/app/models/parkrun';

@Component({
  selector: 'app-map-athlete-overlay',
  templateUrl: './map-athlete-overlay.component.html',
  styleUrls: ['./map-athlete-overlay.component.css']
})
export class MapAthleteOverlayComponent implements OnInit {

  private _athlete: Athlete;

  @Input()
  set athlete(athlete: Athlete) {
    this._athlete = athlete;
    this.card = this.trumpsService.createCard(athlete);
  }

  get athlete(): Athlete {
    return this._athlete;
  }

  card: Card;

  @Output() closeOverlay = new EventEmitter<boolean>();

  constructor(private trumpsService: TrumpsService) {
  }

  ngOnInit() {
  }

  cardClosed() {
    this.closeOverlay.emit(true);
  }

}

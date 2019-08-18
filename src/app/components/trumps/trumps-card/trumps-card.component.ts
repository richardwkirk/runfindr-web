import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Card } from 'src/app/models/Trumps';
import { faWindowClose, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { TrumpsService } from 'src/app/services/trumps.service';
import { AthleteService } from 'src/app/services/athlete.service';

@Component({
  selector: 'app-trumps-card',
  templateUrl: './trumps-card.component.html',
  styleUrls: ['./trumps-card.component.css']
})
export class TrumpsCardComponent implements OnInit {

  @Input() card: Card;

  @Output() onCloseCard = new EventEmitter<Card>();

  faClose = faWindowClose;
  faReload = faSyncAlt;

  @Input() cardWidth;

  @Input() printable = false;

  constructor(private trumpsService: TrumpsService,
              private athleteService: AthleteService,
              private elementRef: ElementRef,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  reload() {
    this.athleteService.loadAthlete(this.card.athlete.id, false);
  }

  closeCard() {
    this.onCloseCard.emit(this.card);
  }

  selectImage() {
    const defaultText = 'Please provide a public image URL or use https://lookup-id.com/ too lookup a facebook profile ids.';
    const facebookId = window.prompt(`Please provide a public URL to an image or the facebook profile ID for ${this.card.athlete.name} (A${this.card.athlete.id})`,
                          this.card.imageDetails.rawInput || defaultText);
    if (facebookId !== null) {
      this.trumpsService.setCardImage(this.card, facebookId);
    }
  }

}

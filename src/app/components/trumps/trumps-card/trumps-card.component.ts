import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/Trumps';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { TrumpsService } from 'src/app/services/trumps.service';

@Component({
  selector: 'app-trumps-card',
  templateUrl: './trumps-card.component.html',
  styleUrls: ['./trumps-card.component.css']
})
export class TrumpsCardComponent implements OnInit {

  @Input() card: Card;

  @Output() onCloseCard = new EventEmitter<Card>();

  faClose = faWindowClose;

  constructor(private trumpsService: TrumpsService) { }

  ngOnInit() {
  }

  closeCard() {
    this.onCloseCard.emit(this.card);
  }

  selectImage() {
    const defaultText = 'Please use https://lookup-id.com/ too lookup facebook profile ids.';
    const facebookId = window.prompt(`Please provide the facebook profile ID for ${card.athlete.name} (A${card.athlete.id})`,
                          this.card.imageDetails.facebookId || defaultText);
    if (facebookId !== null) {
      this.trumpsService.setImageFromFacebookProfile(this.card, facebookId);
    }
  }
}

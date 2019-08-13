import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/Trumps';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../layout/LayoutOptions';
import { TrumpsService } from 'src/app/services/trumps.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trumps',
  templateUrl: './trumps.component.html',
  styleUrls: ['./trumps.component.css']
})
export class TrumpsComponent implements OnInit, OnDestroy {

  cards: Card[] = [];

  faClose = faWindowClose;

  constructor(private route: ActivatedRoute,
              private layoutService: LayoutService,
              private athleteService: AthleteService,
              private trumpsService: TrumpsService) {
    layoutService.setMenuContext([MenuContext.Athletes]);
  }

  ngOnInit() {
    this.trumpsService.startListening();

    this.trumpsService.cards.subscribe(cards => {
      this.cards = cards;
    });

    this.route.params.subscribe( params => {
      if (params.athleteId) {
        this.athleteService.loadAthlete(params.athleteId, false);
      }
    });
  }

  ngOnDestroy() {
    this.trumpsService.stopListening();
  }

  removeCard(athleteId) {
    this.trumpsService.removeCard(athleteId);
  }

  selectImage(card: Card) {
    const defaultText = 'Please use https://lookup-id.com/ too lookup facebook profile ids.';
    const facebookId = window.prompt(`Please provide the facebook profile ID for ${card.athlete.name} (A${card.athlete.id})`,
                          card.imageDetails.facebookId || defaultText);
    this.trumpsService.setImageFromFacebookProfile(card, facebookId);
  }
}

import { Component, OnInit, OnDestroy, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/Trumps';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../layout/LayoutOptions';
import { TrumpsService } from 'src/app/services/trumps.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { TrumpsCardComponent } from './trumps-card/trumps-card.component';

@Component({
  selector: 'app-trumps',
  templateUrl: './trumps.component.html',
  styleUrls: ['./trumps.component.css']
})
export class TrumpsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(TrumpsCardComponent) cardComponents !: QueryList<TrumpsCardComponent>;

  cards: Card[] = [];

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

  ngAfterViewInit() {
    this.cardComponents.forEach(c => c.resizeImages());
  }

  ngOnDestroy() {
    this.trumpsService.stopListening();
  }

  removeCard(card: Card) {
    this.trumpsService.removeCard(card.athlete.id);
  }

}

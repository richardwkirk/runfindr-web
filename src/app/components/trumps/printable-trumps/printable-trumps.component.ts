import { Component, OnInit, OnDestroy, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../models/Trumps';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../../layout/LayoutOptions';
import { TrumpsService } from 'src/app/services/parkrun/trumps.service';
import { AthleteService } from 'src/app/services/parkrun/athlete.service';
import { TrumpsCardComponent } from '../trumps-card/trumps-card.component';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';

@Component({
  selector: 'app-printable-trumps',
  templateUrl: './printable-trumps.component.html',
  styleUrls: ['./printable-trumps.component.css']
})
export class PrintableTrumpsComponent implements OnInit, OnDestroy {

  cards: Card[] = [];

  constructor(private route: ActivatedRoute,
              private layoutService: LayoutService,
              private athleteService: AthleteService,
              private trumpsService: TrumpsService,
              private elementRef: ElementRef) {
    layoutService.setMenuContext([]);
  }

  ngOnInit() {
    this.trumpsService.startListening();

    this.trumpsService.cards.subscribe(cards => {
      this.cards = cards;
    });
  }

  ngOnDestroy() {
    this.trumpsService.stopListening();
  }

}

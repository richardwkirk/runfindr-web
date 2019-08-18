import { Component, OnInit, OnDestroy, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../models/Trumps';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../layout/LayoutOptions';
import { TrumpsService } from 'src/app/services/trumps.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { TrumpsCardComponent } from './trumps-card/trumps-card.component';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';
import { callbackify } from 'util';

@Component({
  selector: 'app-trumps',
  templateUrl: './trumps.component.html',
  styleUrls: ['./trumps.component.css']
})
export class TrumpsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(TrumpsCardComponent) cardComponents !: QueryList<TrumpsCardComponent>;

  cards: Card[] = [];

  masonry: Masonry;

  constructor(private route: ActivatedRoute,
              private layoutService: LayoutService,
              private athleteService: AthleteService,
              private trumpsService: TrumpsService,
              private elementRef: ElementRef) {
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

  onNgMasonryInit($event: Masonry) {
    this.masonry = $event;
  }

  removeCard(card: Card, masonryIndex: number) {
    this.removeMasonryItem(masonryIndex, (item: MasonryGridItem) => {
      this.trumpsService.removeCard(card.athlete.id);
    });
  }

  private removeMasonryItem(masonryIndex: number, callback) {
    if (this.masonry) {
      const cardMasonryElement = this.elementRef.nativeElement.querySelector(`#masonry-item-${masonryIndex}`);
      if (!cardMasonryElement) {
        console.log(`Did not find #masonry-item-${masonryIndex} to remove.`)
        return;
      }

      this.masonry.removeItem(cardMasonryElement)  // removeItem() expects actual DOM (ng-masonry-grid-item element)
          .subscribe((item: MasonryGridItem) => { // item: removed grid item DOM from NgMasonryGrid
            if (item) {
              callback(item);
            }
          });
    }
  }

}

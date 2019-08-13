import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AthleteService } from '../../services/athlete.service';
import { Athlete } from '../../models/Parkrun';
import { Card } from '../../models/Trumps';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../layout/LayoutOptions';
import { ImageDetailsService } from 'src/app/services/image-details.service';

@Component({
  selector: 'app-trumps',
  templateUrl: './trumps.component.html',
  styleUrls: ['./trumps.component.css']
})
export class TrumpsComponent implements OnInit {

  cards: Card[] = [];

  constructor(private route: ActivatedRoute,
              private layoutService: LayoutService,
              private athleteService: AthleteService,
              private imageDetailsService: ImageDetailsService) {
    layoutService.setMenuContext([MenuContext.Athletes]);
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params.athleteId) {
        this.athleteService.loadAthlete(params.athleteId, false);
      }
    });

    this.athleteService.currentAthlete.subscribe(athlete => {
      if (athlete) {
        this.updateAthlete(athlete);
      }
    });
  }

  updateAthlete(athlete: Athlete) {
    if (this.cards.filter(c => c.athlete.id === athlete.id).length === 0) {
      const card = new Card(athlete);
      card.imageDetails = this.imageDetailsService.getImageDetails(athlete.id);
      this.cards.push(card);
    }
  }

  removeCard(athleteId) {
    this.cards = this.cards.filter(c => c.athlete.id !== athleteId);
  }

  selectImage(card: Card) {
    const defaultText = 'Please use https://lookup-id.com/ too lookup facebook profile ids.';
    const facebookId = window.prompt(`Please provide the facebook profile ID for ${card.athlete.name} (A${card.athlete.id})`,
                          card.imageDetails.facebookId || defaultText);
    card.imageDetails = this.imageDetailsService.setImageFromFacebookProfile(card.athlete.id, facebookId);
  }
}

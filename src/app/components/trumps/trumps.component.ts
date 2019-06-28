import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AthleteService } from '../../services/athlete.service';
import { Athlete } from '../../models/Parkrun';
import { Card } from '../../models/Trumps';
@Component({
  selector: 'app-trumps',
  templateUrl: './trumps.component.html',
  styleUrls: ['./trumps.component.css']
})
export class TrumpsComponent implements OnInit {

  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private athleteService: AthleteService) { }

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
      this.cards.push(new Card(athlete));
    }
  }

  removeCard(athleteId) {
    this.cards = this.cards.filter(c => c.athlete.id !== athleteId);
  }
}

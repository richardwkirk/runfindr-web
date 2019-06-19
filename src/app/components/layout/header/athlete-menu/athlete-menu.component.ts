import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AthleteKey } from '../../../../models/Parkrun';
import { AthleteService } from 'src/app/services/athlete.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-athlete-menu',
  templateUrl: './athlete-menu.component.html',
  styleUrls: ['./athlete-menu.component.css']
})
export class AthleteMenuComponent implements OnInit {

  recentAthletes: AthleteKey[];
  visiableRecentAthletes: AthleteKey[];
  compareAthletes: AthleteKey[];

  athleteSearchControl = new FormControl('');
  compareAthleteControl = new FormControl('');

  constructor(private athleteService: AthleteService, private searchHistoryService: SearchHistoryService) { }

  ngOnInit() {
    this.searchHistoryService.recentAthletes.subscribe(athletes => {
      this.recentAthletes = athletes;
      this.excludeCompareAthletesFromRecentList();
    });

    this.athleteService.compareAthletes.subscribe(athletes => {
      this.compareAthletes = athletes;
      this.excludeCompareAthletesFromRecentList();
    });

    this.compareAthleteControl.valueChanges.subscribe(value => {
      this.athleteService.toggleCompare(value);
    });
  }

  excludeCompareAthletesFromRecentList() {
    const excludeCompareAthlete = (ak: AthleteKey) => !this.compareAthletes || !this.compareAthletes.map(a => a.id).includes(ak.id);
    this.visiableRecentAthletes = this.recentAthletes.filter(excludeCompareAthlete);
  }

  searchAthlete() {
    if (this.athleteSearchControl.value) {
      console.log(`Searching for athlete ${this.athleteSearchControl.value}`);
      this.athleteService.loadAthlete(this.athleteSearchControl.value, this.compareAthleteControl.value);
    } else {
      alert('Please enter an athlete id.');
    }
  }

  selectAthlete(athleteId) {
   console.log(`Selecting athlete ${athleteId}`);
   this.athleteService.loadAthlete(athleteId, this.compareAthleteControl.value);
  }

  removeCompareAthlete(athleteId: number) {
    this.athleteService.removeCompareAthlete(athleteId);
  }
}

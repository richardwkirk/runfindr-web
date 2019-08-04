import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AthleteKey } from '../../../../models/Parkrun';
import { AthleteService } from 'src/app/services/athlete.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { MenuContext } from '../../LayoutOptions';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-athlete-menu',
  templateUrl: './athlete-menu.component.html',
  styleUrls: ['./athlete-menu.component.css']
})
export class AthleteMenuComponent implements OnInit {

  showAthleteCompare = false;

  recentAthletes: AthleteKey[];
  visibleRecentAthletes: AthleteKey[];
  compareAthletes: AthleteKey[];

  athleteSearchControl = new FormControl('');
  compareAthleteControl = new FormControl('');

  constructor(private layoutService: LayoutService,
              private athleteService: AthleteService,
              private searchHistoryService: SearchHistoryService) { }

  ngOnInit() {
    this.layoutService.menuContext.subscribe(context => {
      this.showAthleteCompare = context != null ? context.indexOf(MenuContext.CompareAthletes) > -1 : false;
    });

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
    this.visibleRecentAthletes = this.recentAthletes.filter(excludeCompareAthlete);
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

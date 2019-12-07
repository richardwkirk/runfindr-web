import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { AthleteService } from '../../services/athlete.service';
import { LayoutService } from '../../services/layout.service';
import { Athlete, Country } from '../../models/parkrun';
import { MenuContext } from '../layout/LayoutOptions';
import { MatDialog } from '@angular/material/dialog';
import { MapSettings } from 'src/app/models/MapSettings';
import { MapSettingsDialogComponent } from './settings/map-settings-dialog.component';
import { faCog, faCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AgmContainerComponent } from './agm/agm-container/agm-container.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedCountry: Country;

  athlete: Athlete;
  compareAthletes: Athlete[];

  settingsIcon = faCog;
  backIcon = faCircle;
  athletesIcon = faUser;

  mapSettings: MapSettings;

  @ViewChild('agmMap', {static: false}) _agmMapComponent: AgmContainerComponent;

  @ViewChild('athleteOverlay', {static: false}) _dialogTemplate: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private route: ActivatedRoute,
              private layoutService: LayoutService,
              private locationService: LocationService,
              private athleteService: AthleteService,
              private dialog: MatDialog,
              private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef) {

    layoutService.setMenuContext([MenuContext.Countries, MenuContext.Athletes, MenuContext.CompareAthletes]);

    this.mapSettings = {
      showOrder: false,
      showTogetherness: false,
      specialEvent: 'none'
    };
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params) {

        if (params.special) {
          switch (params.special.toLowerCase()) {
            case 'extra':
            case 'christmas':
            case 'xmas':
              this.mapSettings.specialEvent = 'extra';
              break;
            case 'newyear':
            case 'nyd':
              this.mapSettings.specialEvent = 'newyear';
              break;
          }
          this.applySettings(this.mapSettings);
        }

        const selectedCountryName = params.region ? params.region : 'World';
        console.log(`Country set to ${selectedCountryName}`);
        this.locationService.selectCountry(selectedCountryName);

        if (params.compareId) {
          this.athleteService.loadAthlete(params.athleteId, true);
          this.athleteService.loadAthlete(params.compareId, true);
        }
        else if (params.athleteId) {
          this.athleteService.loadAthlete(params.athleteId, false);
        }

      }
    });

    this.athleteService.currentAthlete.subscribe(athlete => {
      if (athlete) {
        this.athlete = athlete;
        this.updateAthleteName();
      }
    });

    this.athleteService.compareAthletes.subscribe(athletes => {
      this.compareAthletes = athletes;
    });

    this.locationService.country.subscribe(country => {
      this.selectedCountry = country;
    });
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this._overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  updateAthleteName() {
    const athleteNameSpan = document.getElementById('athleteName');
    athleteNameSpan.innerHTML = String(this.athlete.name);
  }

  showSettings() {
    const dialogRef = this.dialog.open(MapSettingsDialogComponent, {
      width: '250px',
      data: this.mapSettings
    });

    dialogRef.afterClosed().subscribe(settings => {
      if (settings) {
        this.applySettings(settings);
      }
    });
  }

  showAthlete() {
    this._overlayRef.attach(this._portal);
  }

  closeAthlete() {
    this.closeOverlay();
  }

  closeOverlay() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

  applySettings(settings: MapSettings) {
    console.log(`Applying new map settings:`);
    console.log(this.mapSettings);

    this.mapSettings = settings;
    if (this._agmMapComponent) {
      this._agmMapComponent.mapSettings = settings;
    }

    if (settings.specialEvent !== 'none') {
      this.locationService.showSpecialEvents();
    }
  }
}

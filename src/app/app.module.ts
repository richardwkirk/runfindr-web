import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBarcodeModule } from 'ngx-barcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { TrumpsComponent } from './components/trumps/trumps.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { CountryMenuComponent } from './components/layout/header/country-menu/country-menu.component';
import { AthleteMenuComponent } from './components/layout/header/athlete-menu/athlete-menu.component';

import { LAZY_MAPS_API_CONFIG } from '@agm/core';
import { MapsConfig } from './maps-config';
import { TrumpsInstructionsComponent } from './components/trumps/trumps-instructions/trumps-instructions.component';
import { TrumpsCardComponent } from './components/trumps/trumps-card/trumps-card.component';
import { MapSettingsDialogComponent } from './components/map/settings/map-settings-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    WelcomeComponent,
    CountryMenuComponent,
    AthleteMenuComponent,
    TrumpsComponent,
    TrumpsInstructionsComponent,
    TrumpsCardComponent,
    MapSettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot(),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgxBarcodeModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    MapSettingsDialogComponent
  ],
  entryComponents: [
    MapSettingsDialogComponent
  ],
  providers: [{
    provide: LAZY_MAPS_API_CONFIG,
    useClass: MapsConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

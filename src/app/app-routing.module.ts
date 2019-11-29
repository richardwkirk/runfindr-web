import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TrumpsComponent } from './components/trumps/trumps.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AndroidPrivacyPolicyComponent } from './components/pages/android/android-privacy-policy/android-privacy-policy.component';
import { PrintableTrumpsComponent } from './components/trumps/printable-trumps/printable-trumps.component';

const routes: Routes = [
  { path: 'map/:region', component: MapComponent },
  { path: 'map/:region/:athleteId', component: MapComponent },
  { path: 'map/:region/:athleteId/:compareId', component: MapComponent },
  { path: 'special/:special/:region/:athleteId', component: MapComponent },
  { path: 'trumps', component: TrumpsComponent },
  { path: 'trumps/printable', component: PrintableTrumpsComponent },
  { path: 'trumps/:athleteId', component: TrumpsComponent },
  { path: '', component: WelcomeComponent },
  { path: 'android', component: AndroidPrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

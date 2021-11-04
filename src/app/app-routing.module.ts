import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TrumpsComponent } from './components/trumps/trumps.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AndroidPrivacyPolicyComponent } from './components/pages/android/android-privacy-policy/android-privacy-policy.component';
import { PrintableTrumpsComponent } from './components/trumps/printable-trumps/printable-trumps.component';
import { HelpComponent } from './components/pages/help/help.component';
import { ProfileComponent } from './components/pages/users/profile/profile.component';
import { ParkrunComponent } from './components/pages/welcome/parkrun/parkrun.component';
import { RunsComponent } from './components/pages/runs/runs.component';

const routes: Routes = [
  { path: 'map/:region', component: MapComponent },
  { path: 'map/:region/:athleteId', component: MapComponent },
  { path: 'map/:region/:athleteId/:compareId', component: MapComponent },
  { path: 'special/:special/:region/:athleteId', component: MapComponent },
  { path: 'special/:special/:region', component: MapComponent },
  { path: 'trumps', component: TrumpsComponent },
  { path: 'trumps/printable', component: PrintableTrumpsComponent },
  { path: 'trumps/:athleteId', component: TrumpsComponent },
  { path: 'parkrun', component: ParkrunComponent },
  { path: '', component: WelcomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'android', component: AndroidPrivacyPolicyComponent },
  
  { path: 'profile', component: ProfileComponent },
  { path: 'runs', component: RunsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

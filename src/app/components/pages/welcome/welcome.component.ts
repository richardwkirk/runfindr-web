import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { MenuContext } from '../../layout/LayoutOptions';
import { Icons } from '../../layout/Icons';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  worldIcon = Icons.World;
  ukIcon = Icons.Uk;
  trumpsIcon = Icons.Trumps;
  christmasIcon = Icons.Christmas;
  newYearIcon = Icons.NewYear;
  userIcon = Icons.User;
  runningIcon = Icons.Running;
  signInIcon = Icons.SignIn;
  signOutIcon = Icons.SignOut;

  constructor(private layoutService: LayoutService,
              public auth: AuthService,
              public profileService: ProfileService) {
    layoutService.setMenuContext([MenuContext.Countries]);
  }

  ngOnInit() {
  }

}

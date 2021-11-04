import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Icons } from 'src/app/components/layout/Icons';
import { UserProfile } from 'src/app/models/run-directory/UserProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  runningIcon = Icons.Running;

  userProfile: UserProfile;

  constructor(public profileService: ProfileService) { 
    this.profileService.userProfile.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }

  ngOnInit() {
  }

}
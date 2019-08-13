import { Inject, Injectable } from '@angular/core';
import { AthleteService } from 'src/app/services/athlete.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CardImageDetails } from '../models/Trumps';

@Injectable({
  providedIn: 'root'
})

export class ImageDetailsService {

  static defaultImage = {
    imageUrl: '/assets/runfindr_icon_hires2.png',
    text: 'No image selected.'
  };

  static STORAGE_KEY = 'image_details';

  loadedImageDetails: { [athleteId: number]: CardImageDetails } = {};

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private athleteService: AthleteService) {
    this.loadedImageDetails = this.storage.get(ImageDetailsService.STORAGE_KEY) || {};
  }

  getImageDetails(athleteId: number): CardImageDetails {
    if (this.loadedImageDetails.hasOwnProperty(athleteId)) {
      return this.loadedImageDetails[athleteId];
    }
    return ImageDetailsService.defaultImage;
  }

  setImageDetails(athleteId: number, imageDetails: CardImageDetails) {
    this.loadedImageDetails[athleteId] = imageDetails;
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  removeImageDetails(athleteId: number) {
    if (this.loadedImageDetails.hasOwnProperty(athleteId)) {
      delete this.loadedImageDetails[athleteId];
    }
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  setImageFromFacebookProfile(athleteId, profileId): CardImageDetails {
    let imageDetails: CardImageDetails = ImageDetailsService.defaultImage;
    if (profileId) {
      imageDetails = {
        facebookId: profileId,
        imageUrl: `https://graph.facebook.com/${profileId}/picture?type=large`,
        text: `Using facebook profile picture for ID ${profileId}`
      };
      this.setImageDetails(athleteId, imageDetails);
    }
    else {
      if (this.getImageDetails(athleteId).facebookId) {
        this.removeImageDetails(athleteId);
      }
    }
    return imageDetails;
  }

}

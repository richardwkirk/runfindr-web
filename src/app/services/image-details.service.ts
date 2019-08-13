import { Inject, Injectable } from '@angular/core';
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

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.loadedImageDetails = this.storage.get(ImageDetailsService.STORAGE_KEY) || {};
  }

  public getAthleteImage(athleteId: number): CardImageDetails {
    if (this.loadedImageDetails.hasOwnProperty(athleteId)) {
      return this.loadedImageDetails[athleteId];
    }
    return ImageDetailsService.defaultImage;
  }

  private setAthleteImage(athleteId: number, imageDetails: CardImageDetails) {
    this.loadedImageDetails[athleteId] = imageDetails;
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  private removeAthleteImage(athleteId: number) {
    if (this.loadedImageDetails.hasOwnProperty(athleteId)) {
      delete this.loadedImageDetails[athleteId];
    }
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  addFacebookImageForAthlete(athleteId, profileId): CardImageDetails {
    let imageDetails: CardImageDetails = ImageDetailsService.defaultImage;
    if (profileId) {
      imageDetails = {
        facebookId: profileId,
        imageUrl: `https://graph.facebook.com/${profileId}/picture?type=large`,
        text: `Using facebook profile picture for ID ${profileId}`
      };
      this.setAthleteImage(athleteId, imageDetails);
    }
    else {
      if (this.getAthleteImage(athleteId).facebookId) {
        this.removeAthleteImage(athleteId);
      }
    }
    return imageDetails;
  }

}

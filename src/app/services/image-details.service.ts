import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CardImageDetails } from '../models/Trumps';

@Injectable({
  providedIn: 'root'
})

export class ImageDetailsService {

  public static defaultImage = {
    rawInput: '',
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

  public setAthleteImage(athleteId: number, imageDetails: CardImageDetails) {
    this.loadedImageDetails[athleteId] = imageDetails;
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  public removeAthleteImage(athleteId: number) {
    if (this.loadedImageDetails.hasOwnProperty(athleteId)) {
      delete this.loadedImageDetails[athleteId];
    }
    this.storage.set(ImageDetailsService.STORAGE_KEY, this.loadedImageDetails);
  }

  public createImage(imageText: string): CardImageDetails {
    if (Number.isInteger(+imageText)) {
      return this.createFromFacebookProfile(+imageText);
    }
    else {
      return this.createFromUrl(imageText);
    }
  }

  private createFromFacebookProfile(profileId: number): CardImageDetails {
    if (profileId) {
      return {
        rawInput: profileId.toString(),
        facebookId: profileId,
        imageUrl: `https://graph.facebook.com/${profileId}/picture?type=large`,
        text: `Using facebook profile picture for ID ${profileId}`
      };
    }
    return null;
  }

  private createFromUrl(url: string): CardImageDetails {
    if (url) {
      return {
        rawInput: url,
        imageUrl: url,
        text: `Using url provided`
      };
    }
    return null;
  }

}

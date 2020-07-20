import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserProfile } from '../models/UserProfile';
import { RunfindrEnvironmentService } from './runfindr-environment.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Date8NumberUtils } from '../models/Date8NumberUtils';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userProfileSubject = new BehaviorSubject<UserProfile>(null);
  userProfile = this.userProfileSubject.asObservable();
  
  constructor(private auth: AuthService,
              private runfindrEnvironmentService: RunfindrEnvironmentService,
              private http: HttpClient) {
    auth.userProfile$.subscribe((authProfile) => {
      if (authProfile) {
        this.getOrCreateUserProfile(authProfile);
      }
    });
  }

  private getOrCreateUserProfile(authProfile: any) {
    const userProfile = this.getUser(authProfile).subscribe((userProfile) => {
      if (userProfile) {
        this.userProfileSubject.next(userProfile);
        if (userProfile.picture !== authProfile.picture) {
          userProfile.picture = authProfile.picture;
          this.saveUserProfile(userProfile);
        }
      }
      else {
        this.createUserProfileFromAuth(authProfile);
      }
    });
  }

  private getUser(authProfile) : Observable<UserProfile> {
    const userId = `user-${authProfile.sub}`;
    return this.http.get<UserProfile>(`${this.runfindrEnvironmentService.getLocalApiUrl()}/user/${userId}`).pipe(retry(3), catchError(this.handleError));
  }

  private createUserProfileFromAuth(authProfile: any) : void {
    const userProfile : UserProfile = {
      type: 'user',
      uid: `user-${authProfile.sub}`,
      date: Date8NumberUtils.now(),
      user_id: authProfile.sub,
      given_name: authProfile.given_name,
      family_name: authProfile.family_name,
      email: authProfile.email,
      picture: authProfile.picture,
      parkrun_enabled: false,
      cdt: new Date().toISOString(),
      udt: new Date().toISOString()
    };
    this.userProfileSubject.next(userProfile);
    this.saveUserProfile(userProfile);
  }

  private saveUserProfile(userProfile: UserProfile) : void {
    userProfile.udt = new Date().toISOString();
    this.http.put<UserProfile>(`${this.runfindrEnvironmentService.getLocalApiUrl()}/user/${userProfile.uid}`, userProfile).pipe(retry(3), catchError(this.handleError)).subscribe((userProfile) => {
      console.log(`Saved user profile for ${userProfile.user_id} (${userProfile.given_name} ${userProfile.family_name})`)
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}

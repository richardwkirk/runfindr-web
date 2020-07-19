import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

class RunfindrEnvironmentVariables {
  environmentUrl: string;
  serverUrl: string;
  googleApiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class RunfindrEnvironmentService {

  private envSource = new BehaviorSubject<any>(null);
  loadedEnvironment = this.envSource.asObservable();

  env = environment;

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    const localEnvironment: RunfindrEnvironmentVariables = this.env.runfindr;
    if ('environmentUrl' in localEnvironment && localEnvironment.environmentUrl !== null) {
      this.loadFromUrl(localEnvironment.environmentUrl);
    } else {
      this.envSource.next(localEnvironment);
      console.log(`Using local runfindr environment settings...`);
      //console.log(this.envSource.value);
    }
  }

  loadFromUrl(environmentUrl) {
    console.log(`Loading environment settings from ${environmentUrl}`);
    this.http.get<any>(environmentUrl).subscribe(env => {
      this.envSource.next(env);
      console.log(`Loaded runfindr environment settings from server...`);
      console.log(this.envSource.value);
    });
  }

  getApiUrl() {
    if (this.envSource.value) {
      return `${this.envSource.value.serverUrl}/api`;
    } else {
      console.error('ERROR: runfindr environment has not been loaded when requesting URL.');
      return null;
    }
  }

  getGoogleApiKey() {
    if (this.envSource.value) {
      return this.envSource.value.googleApiKey;
    } else {
      console.error('ERROR: runfindr environment has not been loaded when requesting Google API key.');
      return null;
    }
  }

  getAuth0Details() {
    if (this.envSource.value) {
      return {
        domain: this.envSource.value.auth0Domain,
        clientId: this.envSource.value.auth0ClientId
      }
    } else {
      console.error('ERROR: runfindr environment has not been loaded when requesting Google API key.');
      return null;
    }
  }
}

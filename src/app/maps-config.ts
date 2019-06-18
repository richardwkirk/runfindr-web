import { Injectable } from '@angular/core';
import { LazyMapsAPILoaderConfigLiteral} from '@agm/core';
import { RunfindrEnvironmentService } from './services/runfindr-environment.service';

@Injectable()
export class MapsConfig implements LazyMapsAPILoaderConfigLiteral {
  public apiKey: string;

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService) {
    this.runfindrEnvironmentService.loadedEnvironment.subscribe(env => {
      if (env) {
        this.apiKey = env.googleApiKey;
      }
    });
  }
}
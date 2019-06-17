import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RunfindrEnvironmentService {

  env = environment;

  loadedEnvironment;

  constructor() { 
    this.load();
  }

  load() {
    const runfindrEnvName = this.env["RUNFINDR_ENV"] || 'default';
    console.log(`runfindr environment set to [${runfindrEnvName}]`);

    const allEnvironments = this.env.runfindr;
    console.log(`Available environments are [${Object.keys(allEnvironments)}]`);
    
    if (runfindrEnvName in allEnvironments) {
      this.loadedEnvironment = allEnvironments[runfindrEnvName];
      console.log(`Loaded ${runfindrEnvName} environment`);
      console.log(this.loadedEnvironment);
    }
    else {
      console.log(`ERROR: ${runfindrEnvName} environment is not available.`)
    }
  }

  getApiUrl() {
    return `${this.loadedEnvironment.server.url}/api`;
  }
  
}

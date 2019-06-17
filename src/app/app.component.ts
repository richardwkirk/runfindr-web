import { Component } from '@angular/core';
import { RunfindrEnvironmentService } from './services/runfindr-environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'runfindr-web';
  isReady = false;

  constructor(private runfindrEnvironmentService: RunfindrEnvironmentService) {}

  ngOnInit() {
    this.runfindrEnvironmentService.loadedEnvironment.subscribe(env => {
      if (env) {
        this.isReady = true;
      }
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapSettings } from 'src/app/models/MapSettings';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-map-settings-dialog',
  templateUrl: './map-settings-dialog.component.html',
  styleUrls: ['./map-settings-dialog.component.css']
})
export class MapSettingsDialogComponent implements OnInit {

  public specialEvent = 'Special Event';

  constructor(private locationService: LocationService,
              public dialogRef: MatDialogRef<MapSettingsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public settings: MapSettings) { }

  ngOnInit() {
    this.locationService.country.subscribe(country => {
      if (country) {
        this.specialEvent = country.specialEvent || 'Special Event';
      }
    });
  }

  discard(): void {
    this.dialogRef.close();
  }

}

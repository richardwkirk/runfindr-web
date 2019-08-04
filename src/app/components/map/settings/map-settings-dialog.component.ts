import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapSettings } from 'src/app/models/MapSettings';

@Component({
  selector: 'app-map-settings-dialog',
  templateUrl: './map-settings-dialog.component.html',
  styleUrls: ['./map-settings-dialog.component.css']
})
export class MapSettingsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MapSettingsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public settings: MapSettings) { }

  ngOnInit() {
  }

  discard(): void {
    this.dialogRef.close();
  }

}

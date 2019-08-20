import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAthleteOverlayComponent } from './map-athlete-overlay.component';

describe('MapAthleteOverlayComponent', () => {
  let component: MapAthleteOverlayComponent;
  let fixture: ComponentFixture<MapAthleteOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAthleteOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAthleteOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

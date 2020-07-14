import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkrunComponent } from './parkrun.component';

describe('ParkrunComponent', () => {
  let component: ParkrunComponent;
  let fixture: ComponentFixture<ParkrunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkrunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

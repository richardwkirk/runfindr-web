import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteMenuComponent } from './athlete-menu.component';

describe('AthleteMenuComponent', () => {
  let component: AthleteMenuComponent;
  let fixture: ComponentFixture<AthleteMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

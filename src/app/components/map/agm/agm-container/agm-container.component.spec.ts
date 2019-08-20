import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmContainerComponent } from './agm-container.component';

describe('AgmContainerComponent', () => {
  let component: AgmContainerComponent;
  let fixture: ComponentFixture<AgmContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgmContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

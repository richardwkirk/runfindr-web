import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrumpsCardComponent } from './trumps-card.component';

describe('TrumpsCardComponent', () => {
  let component: TrumpsCardComponent;
  let fixture: ComponentFixture<TrumpsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrumpsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrumpsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

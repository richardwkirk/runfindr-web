import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrumpsInstructionsComponent } from './trumps-instructions.component';

describe('TrumpsInstructionsComponent', () => {
  let component: TrumpsInstructionsComponent;
  let fixture: ComponentFixture<TrumpsInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrumpsInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrumpsInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

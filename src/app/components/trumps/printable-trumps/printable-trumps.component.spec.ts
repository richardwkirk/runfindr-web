import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintableTrumpsComponent } from './printable-trumps.component';

describe('PrintableTrumpsComponent', () => {
  let component: PrintableTrumpsComponent;
  let fixture: ComponentFixture<PrintableTrumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintableTrumpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintableTrumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

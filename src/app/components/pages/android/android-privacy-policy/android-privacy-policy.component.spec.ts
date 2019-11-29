import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidPrivacyPolicyComponent } from './android-privacy-policy.component';

describe('AndroidPrivacyPolicyComponent', () => {
  let component: AndroidPrivacyPolicyComponent;
  let fixture: ComponentFixture<AndroidPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TrumpsService } from './trumps.service';

describe('TrumpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrumpsService = TestBed.get(TrumpsService);
    expect(service).toBeTruthy();
  });
});

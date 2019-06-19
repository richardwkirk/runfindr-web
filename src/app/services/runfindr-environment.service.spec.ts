import { TestBed } from '@angular/core/testing';

import { RunfindrEnvironmentService } from './runfindr-environment.service';

describe('RunfindrEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunfindrEnvironmentService = TestBed.get(RunfindrEnvironmentService);
    expect(service).toBeTruthy();
  });
});

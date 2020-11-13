import { TestBed } from '@angular/core/testing';

import { RegirectGuardService } from './regirect-guard.service';

describe('RegirectGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegirectGuardService = TestBed.get(RegirectGuardService);
    expect(service).toBeTruthy();
  });
});

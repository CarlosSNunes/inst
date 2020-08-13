import { TestBed } from '@angular/core/testing';

import { SimuladoresService } from './simuladores.service';

describe('SimuladoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimuladoresService = TestBed.get(SimuladoresService);
    expect(service).toBeTruthy();
  });
});

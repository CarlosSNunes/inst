import { TestBed } from '@angular/core/testing';

import { FaleConoscoService } from './fale-conosco.service';

describe('FaleConoscoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaleConoscoService = TestBed.get(FaleConoscoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpHandlerService } from './http-handler.service';

describe('HttphandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpHandlerService = TestBed.get(HttpHandlerService);
    expect(service).toBeTruthy();
  });
});

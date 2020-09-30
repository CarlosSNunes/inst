/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaisLidosService } from './mais-lidos.service';

describe('Service: MaisLidos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaisLidosService]
    });
  });

  it('should ...', inject([MaisLidosService], (service: MaisLidosService) => {
    expect(service).toBeTruthy();
  }));
});

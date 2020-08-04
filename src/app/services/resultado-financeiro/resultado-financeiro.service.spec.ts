import { TestBed } from '@angular/core/testing';

import { ResultadoFinanceiroService } from './resultado-financeiro.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('ResultadoFinanceiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ResultadoFinanceiroService = TestBed.get(ResultadoFinanceiroService);
    expect(service).toBeTruthy();
  });
});

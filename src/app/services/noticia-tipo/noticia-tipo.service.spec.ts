import { TestBed } from '@angular/core/testing';

import { NoticiaTipoService } from './noticia-tipo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NoticiaTipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: NoticiaTipoService = TestBed.get(NoticiaTipoService);
    expect(service).toBeTruthy();
  });
});

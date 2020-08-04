import { TestBed } from '@angular/core/testing';

import { NoticiaService } from './noticia.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NoticiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: NoticiaService = TestBed.get(NoticiaService);
    expect(service).toBeTruthy();
  });
});

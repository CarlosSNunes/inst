import { TestBed } from '@angular/core/testing';

import { TipoService } from './tipo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoticiaTipoCreateModel } from 'src/models/noticia-tipo/noticia-tipo-create.model';
import { NoticiaTipoUpdateModel } from 'src/models/noticia-tipo/noticia-tipo-update.model';

describe('TipoService', () => {
  let service: TipoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(TipoService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    const result = service.getAll();
    expect(result).not.toBeNull();
  });

  it('getById', () => {
    const result = service.getById('1');
    expect(result).not.toBeNull();
  });

  it('post', () => {
    const tag = new NoticiaTipoCreateModel({ descricao: 'Saúde' });
    const result = service.post([tag]);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const tag = new NoticiaTipoUpdateModel({ descricao: 'Saúde' });
    const result = service.put([tag]);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const result = service.delete(1);
    expect(result).not.toBeNull();
  });
});

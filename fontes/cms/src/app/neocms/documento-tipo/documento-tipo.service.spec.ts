import { TestBed } from '@angular/core/testing';

import { DocumentoTipoService } from './documento-tipo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentoTipoCreateModel } from 'src/models/documento-tipo/documento-tipo-create.model';
import { DocumentoTipoUpdateModel } from 'src/models/documento-tipo/documento-tipo-update.model';

describe('DocumentoTipoService', () => {
  let service: DocumentoTipoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DocumentoTipoService);
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
    const model = new DocumentoTipoCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new DocumentoTipoUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

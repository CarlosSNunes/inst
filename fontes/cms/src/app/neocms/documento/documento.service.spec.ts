import { TestBed } from '@angular/core/testing';

import { DocumentoService } from './documento.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoCreateModel } from 'src/models/documento/documento-create.model';
import { DocumentoUpdateModel } from 'src/models/documento/documento-update.model';

describe('DocumentoService', () => {
  let service: DocumentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DocumentoService);
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
    const model = new DocumentoCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new DocumentoUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

import { TestBed } from '@angular/core/testing';

import { PerguntaTipoService } from './pergunta-tipo.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaTipoCreateModel } from 'src/models/pergunta-tipo/pergunta-tipo-create.model';
import { PerguntaTipoUpdateModel } from 'src/models/pergunta-tipo/pergunta-tipo-update.model';

describe('PerguntaTipoService', () => {
  let service: PerguntaTipoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PerguntaTipoService);
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
    const model = new PerguntaTipoCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new PerguntaTipoUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

import { TestBed } from '@angular/core/testing';

import { PerguntaService } from './pergunta.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaCreateModel } from 'src/models/pergunta/pergunta-create.model';
import { PerguntaUpdateModel } from 'src/models/pergunta/pergunta-update.model';

describe('PerguntaService', () => {
  let service: PerguntaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PerguntaService);
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
    const model = new PerguntaCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new PerguntaUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

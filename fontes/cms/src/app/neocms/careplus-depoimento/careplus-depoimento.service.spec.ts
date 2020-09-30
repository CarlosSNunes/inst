import { TestBed } from '@angular/core/testing';

import { CareplusDepoimentoService } from './careplus-depoimento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CareplusDepoimentoCreateModel } from 'src/models/careplus-depoimento/careplus-depoimento-create.model';
import { CareplusDepoimentoUpdateModel } from 'src/models/careplus-depoimento/careplus-depoimento-update.model';

describe('CareplusDepoimentoService', () => {
  let service: CareplusDepoimentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CareplusDepoimentoService);
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
    const model = new CareplusDepoimentoCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new CareplusDepoimentoUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

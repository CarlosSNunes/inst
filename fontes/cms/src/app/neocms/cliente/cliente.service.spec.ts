import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteCreateModel } from 'src/models/cliente/cliente-create.model';
import { ClienteUpdateModel } from 'src/models/cliente/cliente-update.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ClienteService);
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
    const model = new ClienteCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new ClienteUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

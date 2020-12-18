import { TestBed } from '@angular/core/testing';

import { CareplusPerfilService } from './careplus-perfil.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CareplusPerfilCreateModel } from 'src/models/careplus-perfil/careplus-perfil-create.model';
import { CareplusPerfilUpdateModel } from 'src/models/careplus-perfil/careplus-perfil-update.model';

describe('CareplusPerfilService', () => {
  let service: CareplusPerfilService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CareplusPerfilService);
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
    const model = new CareplusPerfilCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new CareplusPerfilUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

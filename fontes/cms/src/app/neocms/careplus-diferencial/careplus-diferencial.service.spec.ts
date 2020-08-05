import { TestBed } from '@angular/core/testing';

import { CareplusDiferencialService } from './careplus-diferencial.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CareplusDiferencialCreateModel } from 'src/models/careplus-diferencial/careplus-diferencial-create.model';
import { CareplusDiferencialUpdateModel } from 'src/models/careplus-diferencial/careplus-diferencial-update.model';

describe('CareplusDiferencialService', () => {
  let service: CareplusDiferencialService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CareplusDiferencialService);
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
    const model = new CareplusDiferencialCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new CareplusDiferencialUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

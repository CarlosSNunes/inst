/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
import { TestBed } from '@angular/core/testing';
import { BannerService } from './banner.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { BannerUpdateModel } from 'src/models/banner/banner-update.model';

describe('BannerService', () => {
  let service: BannerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BannerService);
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
    const model = new BannerCreateModel({});
    const result = service.post(model);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const model = new BannerUpdateModel({});
    const result = service.put(model);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const id = 1;
    const result = service.delete(id);
    expect(result).not.toBeNull();
  });
});

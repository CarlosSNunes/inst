import { TestBed } from '@angular/core/testing';

import { NoticiaService } from './noticia.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoticiaCreateModel } from 'src/models/noticia/noticia-create.model';
import { NoticiaUpdateModel } from 'src/models/noticia/noticia-update-model';

describe('NoticiaService', () => {
  let service: NoticiaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(NoticiaService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('uploadImage', () => {
    const result = service.uploadImage(null);
    expect(result).not.toBeNull();
  });

  it('deleteImage', () => {
    const result = service.deleteImage('');
    expect(result).not.toBeNull();
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
    const noticia = new NoticiaCreateModel({ bloco: [], noticiaTag: [] });
    const result = service.post(noticia);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const noticia = new NoticiaUpdateModel({ bloco: [], noticiaTag: [] });
    const result = service.put(noticia);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const result = service.delete(1);
    expect(result).not.toBeNull();
  });
});

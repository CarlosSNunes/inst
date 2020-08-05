import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TagCreateModel } from 'src/models/tag/tag-create.model';
import { TagUpdateModel } from 'src/models/tag/tag-update.model';

describe('TagService', () => {
  let service: TagService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(TagService);
    httpTestingController = TestBed.get(HttpTestingController);
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
    const tag = new TagCreateModel({ descricao: 'Saúde' });
    const result = service.post([tag]);
    expect(result).not.toBeNull();
  });

  it('put', () => {
    const tag = new TagUpdateModel({ descricao: 'Saúde' });
    const result = service.put([tag]);
    expect(result).not.toBeNull();
  });

  it('delete', () => {
    const result = service.delete(1);
    expect(result).not.toBeNull();
  });
});

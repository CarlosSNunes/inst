/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostsBlogService } from './posts-blog.service';

describe('Service: PostsBlog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsBlogService]
    });
  });

  it('should ...', inject([PostsBlogService], (service: PostsBlogService) => {
    expect(service).toBeTruthy();
  }));
});

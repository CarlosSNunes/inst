import { TestBed } from '@angular/core/testing';

import { BannerService } from './banner.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: BannerService = TestBed.get(BannerService);
    expect(service).toBeTruthy();
  });
});

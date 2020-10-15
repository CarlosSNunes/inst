import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { BannerModel } from './../../../../src/models/banner/banner.model';
import { BannerCreateModel } from './../../../../src/models/banner/banner-create.model';
import { BannerUpdateModel } from './../../../../src/models/banner/banner-update.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private readonly API_ENDPOINT = environment.API + '/Banner';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<BannerModel[]>(this.API_ENDPOINT);
  }

  getById(id: string) {
    return this.http.get<BannerModel>(this.API_ENDPOINT + '/' + id);
  }

  post(banner: BannerCreateModel) {
    return this.http.post(this.API_ENDPOINT, this.classHelper.jsonToFormData(banner));
  }

  put(banner: BannerUpdateModel) {
    return this.http.put(this.API_ENDPOINT, this.classHelper.jsonToFormData(banner));
  }

  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }
}

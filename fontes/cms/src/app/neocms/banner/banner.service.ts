import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassHelper } from 'src/utils/class-helper';
import { BannerModel } from 'src/models/banner/banner.model';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { BannerUpdateModel } from 'src/models/banner/banner-update.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private url = 'http://52.3.44.106:8081/Banner';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<BannerModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<BannerModel>(this.url + '/' + id);
  }

  post(banner: BannerCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(banner));
  }

  put(banner: BannerUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(banner));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

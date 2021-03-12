import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { BannerListModel, BannerModel } from './../../../../src/models/banner/banner.model';
import { BannerCreateModel } from './../../../../src/models/banner/banner-create.model';
import { BannerUpdateModel } from './../../../../src/models/banner/banner-update.model';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private readonly API_ENDPOINT = environment.API + '/Banner';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number, pageSize: number, filterArea?, ativo?): Observable<BannerListModel> {
    let params = new HttpParams();
    if (filterArea != undefined) {
     params =  params.append('area', filterArea)
    }
    if (ativo != undefined){
     params = params.append('ativo', ativo)
    }
      return this.http.get<BannerListModel>(this.API_ENDPOINT + '/' + page + '/' + pageSize, {params});
   
  }

  getById(id: string): Observable<BannerListModel> {
    return this.http.get<BannerListModel>(this.API_ENDPOINT + '/' + id);
  }

  post(banner: BannerCreateModel) {
    return this.http.post(this.API_ENDPOINT, this.classHelper.jsonToFormData(banner));
  }

  duplicate(id: number) {
    return this.http.get(`${this.API_ENDPOINT}/duplicar/${id}`);
  }

  put(banner: BannerUpdateModel) {
    return this.http.put(this.API_ENDPOINT, this.classHelper.jsonToFormData(banner));
  }

  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }
  changeOrder(order){
    return this.http.put(this.API_ENDPOINT + '/banner-order', order);

  }
}

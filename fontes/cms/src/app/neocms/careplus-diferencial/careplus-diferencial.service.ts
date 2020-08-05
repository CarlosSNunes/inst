import { Injectable } from '@angular/core';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';
import { HttpClient } from '@angular/common/http';
import { CareplusDiferencialUpdateModel } from 'src/models/careplus-diferencial/careplus-diferencial-update.model';
import { CareplusDiferencialCreateModel } from 'src/models/careplus-diferencial/careplus-diferencial-create.model';
import { ClassHelper } from 'src/utils/class-helper';

@Injectable({
  providedIn: 'root'
})
export class CareplusDiferencialService {
  private url = 'https://localhost:4015/CareplusDiferencial';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<CareplusDiferencialModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<CareplusDiferencialModel>(this.url + '/' + id);
  }

  post(diferencial: CareplusDiferencialCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(diferencial));
  }

  put(diferencial: CareplusDiferencialUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(diferencial));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

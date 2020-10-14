import { Injectable } from '@angular/core';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { CareplusDepoimentoCreateModel } from 'src/models/careplus-depoimento/careplus-depoimento-create.model';
import { CareplusDepoimentoUpdateModel } from 'src/models/careplus-depoimento/careplus-depoimento-update.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareplusDepoimentoService {
  private url = 'localhost:8081/CareplusDepoimento';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<CareplusDepoimentoModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<CareplusDepoimentoModel>(this.url + '/' + id);
  }

  post(Depoimento: CareplusDepoimentoCreateModel) {
    return this.http.post(this.url, [Depoimento]);
  }

  put(Depoimento: CareplusDepoimentoUpdateModel) {
    return this.http.put(this.url, [Depoimento]);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

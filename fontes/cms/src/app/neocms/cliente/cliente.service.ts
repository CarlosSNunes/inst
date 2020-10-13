import { Injectable } from '@angular/core';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from './../../../models/cliente/cliente.model';
import { ClienteCreateModel } from './../../../models/cliente/cliente-create.model';
import { ClienteUpdateModel } from './../../../models/cliente/cliente-update.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'https://localhost:4012/Cliente';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<ClienteModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<ClienteModel>(this.url + '/' + id);
  }

  post(cliente: ClienteCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(cliente));
  }

  put(cliente: ClienteUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(cliente));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

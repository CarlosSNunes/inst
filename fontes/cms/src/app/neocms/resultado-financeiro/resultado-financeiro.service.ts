import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassHelper } from 'src/utils/class-helper';
import { ResultadoFinanceiroModel } from 'src/models/resultado-financeiro/resultado-financeiro.model';
import { ResultadoFinanceiroCreateModel } from 'src/models/resultado-financeiro/resultado-financeiro-create.model';
import { ResultadoFinanceiroUpdateModel } from 'src/models/resultado-financeiro/resultado-financeiro-update.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadoFinanceiroService {
  private url = 'https://localhost:4008/ResultadoFinanceiro';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<ResultadoFinanceiroModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<ResultadoFinanceiroModel>(this.url + '/' + id);
  }

  post(banner: ResultadoFinanceiroCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(banner));
  }

  put(banner: ResultadoFinanceiroUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(banner));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { PerguntaTipoCreateModel } from 'src/models/pergunta-tipo/pergunta-tipo-create.model';
import { PerguntaTipoUpdateModel } from 'src/models/pergunta-tipo/pergunta-tipo-update.model';

@Injectable({
  providedIn: 'root'
})
export class PerguntaTipoService {
  private url = 'https://localhost:4012/PerguntaTipo';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<PerguntaTipoModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<PerguntaTipoModel>(this.url + '/' + id);
  }

  post(documentoTipo: PerguntaTipoCreateModel) {
    return this.http.post(this.url, [documentoTipo]);
  }

  put(documentoTipo: PerguntaTipoUpdateModel) {
    return this.http.put(this.url, [documentoTipo]);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

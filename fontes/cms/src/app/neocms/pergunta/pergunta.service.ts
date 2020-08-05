import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { PerguntaCreateModel } from 'src/models/pergunta/pergunta-create.model';
import { PerguntaUpdateModel } from 'src/models/pergunta/pergunta-update.model';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  private url = 'https://localhost:4011/Pergunta';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<PerguntaModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<PerguntaModel>(this.url + '/' + id);
  }

  post(pergunta: PerguntaCreateModel) {
    return this.http.post(this.url, [pergunta]);
  }

  put(pergunta: PerguntaUpdateModel) {
    return this.http.put(this.url, [pergunta]);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

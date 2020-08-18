import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoticiaTipoModel } from 'src/app/models/noticia-tipo.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaTipoService {
  url = 'https://localhost:4006/NoticiaTipo';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<NoticiaTipoModel[]>(this.url);
  }
}

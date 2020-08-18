import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NoticiaModel } from 'src/app/models/noticia.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private url = 'https://localhost:4007/Noticia';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(params: any | null) {
    const queryParamsString = new HttpParams({ fromObject: params }).toString();
    const url = this.url + '/Buscar?' + queryParamsString;
    return this.http.get<NoticiaModel[]>(url);
  }

  getById(id: number): Observable<NoticiaModel> {
    return this.http.get<NoticiaModel>(this.url + '/' + id);
  }
}

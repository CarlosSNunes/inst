import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { DocumentoTipoCreateModel } from 'src/models/documento-tipo/documento-tipo-create.model';
import { DocumentoTipoUpdateModel } from 'src/models/documento-tipo/documento-tipo-update.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoTipoService {
  private url = 'https://localhost:4020/DocumentoTipo';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<DocumentoTipoModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<DocumentoTipoModel>(this.url + '/' + id);
  }

  post(documentoTipo: DocumentoTipoCreateModel) {
    return this.http.post(this.url, [documentoTipo]);
  }

  put(documentoTipo: DocumentoTipoUpdateModel) {
    return this.http.put(this.url, [documentoTipo]);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

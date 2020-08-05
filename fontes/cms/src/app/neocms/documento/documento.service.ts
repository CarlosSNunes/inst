import { Injectable } from '@angular/core';
import { ClassHelper } from 'src/utils/class-helper';
import { HttpClient } from '@angular/common/http';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { DocumentoCreateModel } from 'src/models/documento/documento-create.model';
import { DocumentoUpdateModel } from 'src/models/documento/documento-update.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private url = 'https://localhost:4022/Documento';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<DocumentoModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<DocumentoModel>(this.url + '/' + id);
  }

  post(documento: DocumentoCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(documento));
  }

  put(documento: DocumentoUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(documento));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

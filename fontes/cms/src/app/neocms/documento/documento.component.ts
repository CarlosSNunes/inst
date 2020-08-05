import { Component, OnInit } from '@angular/core';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DocumentoService } from './documento.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit {
  documentos: DocumentoModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showDocumentoDelete: boolean;
  documento: DocumentoModel;

  constructor(
    private documentoService: DocumentoService
  ) { }

  ngOnInit() {
    this.getDocumentos();
  }

  openDocumentoDelete(documento: DocumentoModel) {
    this.documento = documento;
    this.showDocumentoDelete = true;
  }

  getDocumentos() {
    this.showDocumentoDelete = false;
    this.documentoService
      .getAll()
      .subscribe(documentos => {
        this.loaded = true;
        this.documentos = documentos;
      },
        error => {
          this.loaded = true;
        });
  }
}

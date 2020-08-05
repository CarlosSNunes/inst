import { Component, OnInit } from '@angular/core';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DocumentoTipoService } from './documento-tipo.service';
import { throwError } from 'rxjs';
import { CareplusPerfilService } from '../careplus-perfil/careplus-perfil.service';

@Component({
  selector: 'app-documento-tipo',
  templateUrl: './documento-tipo.component.html',
  styleUrls: ['./documento-tipo.component.scss']
})
export class DocumentoTipoComponent implements OnInit {
  documentoTipos: DocumentoTipoModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showDocumentoTipoDelete: boolean;
  documentoTipo: DocumentoTipoModel;

  constructor(
    private documentoTipoService: DocumentoTipoService
  ) { }

  ngOnInit() {
    this.getDocumentoTipos();
  }

  openDocumentoTipoDelete(documentoTipo: DocumentoTipoModel) {
    this.documentoTipo = documentoTipo;
    this.showDocumentoTipoDelete = true;
  }

  getDocumentoTipos() {
    this.showDocumentoTipoDelete = false;
    this.documentoTipoService
      .getAll()
      .subscribe(documentoTipos => {
        this.loaded = true;
        this.documentoTipos = documentoTipos;
      })
      .add(() => this.loaded = true);
  }
}

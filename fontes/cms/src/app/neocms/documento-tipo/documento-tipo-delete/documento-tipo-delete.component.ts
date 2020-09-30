import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoTipoService } from '../documento-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-documento-tipo-delete',
  templateUrl: './documento-tipo-delete.component.html',
  styleUrls: ['./documento-tipo-delete.component.scss']
})
export class DocumentoTipoDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  documentoTipo: DocumentoTipoModel;

  usuario: UserAuthenticateModel;

  constructor(
    private documentoTipoService: DocumentoTipoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteDocumentoTipo() {
    this.documentoTipoService
      .delete(this.documentoTipo.id)
      .subscribe(result => this.closeModal());
  }
}

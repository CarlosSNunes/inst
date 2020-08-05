import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoService } from '../documento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-documento-delete',
  templateUrl: './documento-delete.component.html',
  styleUrls: ['./documento-delete.component.scss']
})
export class DocumentoDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  documento: DocumentoModel;

  usuario: UserAuthenticateModel;

  constructor(
    private documentoService: DocumentoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteDocumento() {
    this.documentoService
      .delete(this.documento.id)
      .subscribe(result => this.closeModal());
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { TipoService } from '../tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-tipo-delete',
  templateUrl: './tipo-delete.component.html',
  styleUrls: ['./tipo-delete.component.scss']
})
export class TipoDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  noticiaTipo: NoticiaTipoModel;

  usuario: UserAuthenticateModel;

  constructor(
    private tipoService: TipoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal(result) {
    this.onClose.emit(result);
  }

  deleteTipo() {
    this.tipoService
      .delete(this.noticiaTipo.id)
      .subscribe(result => this.closeModal(result));
  }

}

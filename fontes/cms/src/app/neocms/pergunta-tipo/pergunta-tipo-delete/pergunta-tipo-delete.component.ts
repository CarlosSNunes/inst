import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-pergunta-tipo-delete',
  templateUrl: './pergunta-tipo-delete.component.html',
  styleUrls: ['./pergunta-tipo-delete.component.scss']
})
export class PerguntaTipoDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  perguntaTipo: PerguntaTipoModel;

  usuario: UserAuthenticateModel;

  constructor(
    private perguntaTipoService: PerguntaTipoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deletePerguntaTipo() {
    this.perguntaTipoService
      .delete(this.perguntaTipo.id)
      .subscribe(result => this.closeModal());
  }
}

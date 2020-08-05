import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaService } from '../pergunta.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-pergunta-delete',
  templateUrl: './pergunta-delete.component.html',
  styleUrls: ['./pergunta-delete.component.scss']
})
export class PerguntaDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  pergunta: PerguntaModel;

  usuario: UserAuthenticateModel;

  constructor(
    private perguntaService: PerguntaService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deletePergunta() {
    this.perguntaService
      .delete(this.pergunta.id)
      .subscribe(result => this.closeModal());
  }
}

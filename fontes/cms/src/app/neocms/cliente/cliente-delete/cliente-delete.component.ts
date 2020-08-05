import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClienteModel } from 'src/models/cliente/cliente.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { ClienteService } from '../cliente.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss']
})
export class ClienteDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  cliente: ClienteModel;

  usuario: UserAuthenticateModel;

  constructor(
    private clienteService: ClienteService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteCliente() {
    this.clienteService
      .delete(this.cliente.id)
      .subscribe(result => this.closeModal());
  }
}

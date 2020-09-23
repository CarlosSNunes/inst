import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.scss']
})
export class UsuarioDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  usuarioModel: UsuarioModel;

  userAuth: UserAuthenticateModel;
  constructor(
    private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userAuth = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteUsuario() {
    this.usuarioService
      .delete(this.usuarioModel.id)
      .subscribe(result => this.closeModal());
  }

}

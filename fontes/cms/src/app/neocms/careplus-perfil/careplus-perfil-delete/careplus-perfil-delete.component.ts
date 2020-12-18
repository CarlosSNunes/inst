import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusPerfilService } from '../careplus-perfil.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-careplus-perfil-delete',
  templateUrl: './careplus-perfil-delete.component.html',
  styleUrls: ['./careplus-perfil-delete.component.scss']
})
export class CareplusPerfilDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  careplusPerfil: CareplusPerfilModel;

  usuario: UserAuthenticateModel;

  constructor(
    private careplusPerfilService: CareplusPerfilService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteCareplusPerfil() {
    this.careplusPerfilService
      .delete(this.careplusPerfil.id)
      .subscribe(result => this.closeModal());
  }
}

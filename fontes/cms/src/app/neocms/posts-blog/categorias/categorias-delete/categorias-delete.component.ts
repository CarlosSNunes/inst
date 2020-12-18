import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriasModel } from './../../../../../../src/models/categorias/categorias.model';
import { UserAuthenticateModel } from './../../../../../../src/models/user-authenticate.model';
import { CategoriasService } from '../categorias.service';
import { AuthenticationService } from './../../../../../../src/app/authentication/authentication.service';

@Component({
  selector: 'app-categorias-delete',
  templateUrl: './categorias-delete.component.html',
  styleUrls: ['./categorias-delete.component.scss']
})
export class CategoriasDeleteComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Input() categoria: CategoriasModel;

  usuario: UserAuthenticateModel;

  constructor(
    private categoriasService: CategoriasService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteCategoria() {
    this.categoriasService
      .delete(this.categoria['result'].id)
      .subscribe(result => this.closeModal());
  }
}

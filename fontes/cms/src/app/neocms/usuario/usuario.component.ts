import { CareplusPerfilModel } from './../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuarioModel } from './../../../models/usuario/usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  showUsuarioDelete: boolean;
  usuarios: UsuarioModel[];
  usuario: UsuarioModel;
  perfis: CareplusPerfilModel[];
  usuarioPerfil: any;
  loaded: boolean;

  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  openUsuarioDelete(usuario: UsuarioModel) {
    this.usuario = usuario;
  }

  /**
   * @description Metodo que lista todos os usuários
   * @memberOf UsuarioComponent
   */
  getUsuarios() {
    this.usuarioService
      .getAll()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      })
      .add(() => this.loaded = true);
  }

}

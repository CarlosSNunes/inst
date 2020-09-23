import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faPlus, faTrash, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showUsuarioDelete: boolean;
  usuario: UsuarioModel;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  
  getUsuarios() {
    this.showUsuarioDelete = false;
    this.usuarioService
      .getAll()
      .subscribe(result => {
        this.loaded = true;
        this.usuarios = result;
      },
        error => {
          this.loaded = true;
        });
  }

  openUsuarioDelete(usuario: UsuarioModel) {
    this.usuario = usuario;
    this.showUsuarioDelete = true;
  }
}

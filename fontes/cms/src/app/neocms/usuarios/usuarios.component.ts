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
  usuariosAtivos: UsuarioModel[] = [];
  usuariosPendentes: UsuarioModel[] = [];
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
        this.usuariosAtivos = result;
        this.usuariosPendentes = result.filter(x => x.usuarioPerfil.length == 0);
      },
        error => {
          this.loaded = true;
        });
  }
}

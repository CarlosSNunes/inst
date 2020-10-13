import { Component, OnInit } from '@angular/core';
import { CareplusPerfilModel } from './../../../../src/models/careplus-perfil/careplus-perfil.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CareplusPerfilService } from './careplus-perfil.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-careplus-perfil',
  templateUrl: './careplus-perfil.component.html',
  styleUrls: ['./careplus-perfil.component.scss']
})
export class CareplusPerfilComponent implements OnInit {
  careplusPerfils: CareplusPerfilModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showCareplusPerfilDelete: boolean;
  careplusPerfil: CareplusPerfilModel;

  constructor(
    private careplusPerfilService: CareplusPerfilService
  ) { }

  ngOnInit() {
    this.getCareplusPerfils();
  }

  openCareplusPerfilDelete(careplusPerfil: CareplusPerfilModel) {
    this.careplusPerfil = careplusPerfil;
    this.showCareplusPerfilDelete = true;
  }

  getCareplusPerfils() {
    this.showCareplusPerfilDelete = false;
    this.careplusPerfilService
      .getAll()
      .subscribe(careplusPerfils => {
        this.loaded = true;
        this.careplusPerfils = careplusPerfils;
      })
      .add(() => this.loaded = true);
  }
}

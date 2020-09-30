import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { CategoriasModel } from 'src/models/categorias/categorias.model';
import { CategoriasService } from './categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriasModel[] = []
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  faFileExcel = faFileExcel;
  loaded: boolean;
  categoria: CategoriasModel
  showCategoriaDelete: boolean

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.getCategorias();
  }

  openCategoriaDelete(categoria: CategoriasModel) {
    this.categoria = categoria;
    this.showCategoriaDelete = true;
  } 

  getCategorias() {
    this.showCategoriaDelete = false;
    this.categoriasService
      .getAll()
      .subscribe(categorias => {
        this.loaded = true;
        this.categorias = categorias;
      },
        error => {
          this.loaded = true;
        });
  }
}

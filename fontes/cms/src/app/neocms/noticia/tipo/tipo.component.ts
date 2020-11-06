import { Component, OnInit } from '@angular/core';
import { NoticiaTipoModel } from './../../../../../src/models/noticia-tipo/noticia-tipo.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TipoService } from './tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  noticiaTipos: NoticiaTipoModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showNoticiaTipoDelete: boolean;
  noticiaTipo: NoticiaTipoModel;

  constructor(
    private noticiaTipoService: TipoService
  ) { }

  ngOnInit() {
    this.getNoticiaTipos();
  }

  openNoticiaTipoDelete(noticiaTipo: NoticiaTipoModel) {
    this.noticiaTipo = noticiaTipo;
    this.showNoticiaTipoDelete = true;
  }

  getNoticiaTipos() {
    this.showNoticiaTipoDelete = false;
    this.noticiaTipoService
      .getAll(1, 100)
      .subscribe(tipos => {
        this.loaded = true;
        this.noticiaTipos = tipos;
      },
        error => {
          this.loaded = true;
        });
  }

}

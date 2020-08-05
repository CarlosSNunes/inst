import { Component, OnInit } from '@angular/core';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-noticia-index',
  templateUrl: './noticia-index.component.html',
  styleUrls: ['./noticia-index.component.scss']
})
export class NoticiaIndexComponent implements OnInit {
  noticias: NoticiaModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  tipos: NoticiaTipoModel[] = [];
  loaded: boolean;
  showNoticiaDelete: boolean;
  noticia: NoticiaModel;

  constructor(
    private noticiaService: NoticiaService
  ) { }

  ngOnInit() {
    this.getNoticias();
  }

  openNoticiaDelete(noticia: NoticiaModel) {
    this.noticia = noticia;
    this.showNoticiaDelete = true;
  }

  getNoticias() {
    this.showNoticiaDelete = false;
    this.noticiaService
      .getAll()
      .subscribe(noticias => {
        this.loaded = true;
        this.noticias = noticias;
      },
        error => {
          this.loaded = true;
        });
  }
}

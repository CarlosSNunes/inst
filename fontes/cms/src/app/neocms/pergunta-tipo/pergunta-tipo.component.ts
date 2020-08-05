import { Component, OnInit } from '@angular/core';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PerguntaTipoService } from './pergunta-tipo.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-pergunta-tipo',
  templateUrl: './pergunta-tipo.component.html',
  styleUrls: ['./pergunta-tipo.component.scss']
})
export class PerguntaTipoComponent implements OnInit {
  perguntaTipos: PerguntaTipoModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showPerguntaTipoDelete: boolean;
  perguntaTipo: PerguntaTipoModel;

  constructor(
    private perguntaTipoService: PerguntaTipoService
  ) { }

  ngOnInit() {
    this.getPerguntaTipos();
  }

  openPerguntaTipoDelete(perguntaTipo: PerguntaTipoModel) {
    this.perguntaTipo = perguntaTipo;
    this.showPerguntaTipoDelete = true;
  }

  getPerguntaTipos() {
    this.showPerguntaTipoDelete = false;
    this.perguntaTipoService
      .getAll()
      .subscribe(perguntaTipos => {
        this.loaded = true;
        this.perguntaTipos = perguntaTipos;
      })
      .add(() => this.loaded = true);
  }
}

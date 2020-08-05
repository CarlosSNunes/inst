import { Component, OnInit } from '@angular/core';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PerguntaService } from './pergunta.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss']
})
export class PerguntaComponent implements OnInit {
  perguntas: PerguntaModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showPerguntaDelete: boolean;
  pergunta: PerguntaModel;

  constructor(
    private perguntaService: PerguntaService
  ) { }

  ngOnInit() {
    this.getPerguntas();
  }

  openPerguntaDelete(pergunta: PerguntaModel) {
    this.pergunta = pergunta;
    this.showPerguntaDelete = true;
  }

  getPerguntas() {
    this.showPerguntaDelete = false;
    this.perguntaService
      .getAll()
      .subscribe(perguntas => {
        this.loaded = true;
        this.perguntas = perguntas;
      })
      .add(() => this.loaded = true);
  }
}

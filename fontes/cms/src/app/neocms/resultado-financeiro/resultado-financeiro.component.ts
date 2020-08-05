import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ResultadoFinanceiroModel } from 'src/models/resultado-financeiro/resultado-financeiro.model';
import { ResultadoFinanceiroService } from './resultado-financeiro.service';

@Component({
  selector: 'app-resultado-financeiro',
  templateUrl: './resultado-financeiro.component.html',
  styleUrls: ['./resultado-financeiro.component.scss']
})
export class ResultadoFinanceiroComponent implements OnInit {
  resultadosFinanceiro: ResultadoFinanceiroModel[] = [];
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  loaded: boolean;
  showResultadoFinanceiroDelete: boolean;
  resultadoFinanceiro: ResultadoFinanceiroModel;

  constructor(
    private resultadoFinanceiroService: ResultadoFinanceiroService
  ) { }

  ngOnInit() {
    this.getResultadosFinanceiro();
  }

  openResultadoFinanceiroDelete(resultadoFinanceiro: ResultadoFinanceiroModel) {
    this.resultadoFinanceiro = resultadoFinanceiro;
    this.showResultadoFinanceiroDelete = true;
  }

  getResultadosFinanceiro() {
    this.showResultadoFinanceiroDelete = false;
    this.resultadoFinanceiroService
      .getAll()
      .subscribe(resultadosFinanceiro => {
        this.loaded = true;
        this.resultadosFinanceiro = resultadosFinanceiro;
      },
        error => {
          this.loaded = true;
        });
  }

}

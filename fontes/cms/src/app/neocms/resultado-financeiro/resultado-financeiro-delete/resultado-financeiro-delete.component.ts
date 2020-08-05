import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResultadoFinanceiroService } from '../resultado-financeiro.service';
import { ResultadoFinanceiroModel } from 'src/models/resultado-financeiro/resultado-financeiro.model';

@Component({
  selector: 'app-resultado-financeiro-delete',
  templateUrl: './resultado-financeiro-delete.component.html',
  styleUrls: ['./resultado-financeiro-delete.component.scss']
})
export class ResultadoFinanceiroDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  resultadoFinanceiro: ResultadoFinanceiroModel;

  usuario: UserAuthenticateModel;

  constructor(
    private resultadoFinanceiroService: ResultadoFinanceiroService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteResultadoFinanceiro() {
    this.resultadoFinanceiroService
      .delete(this.resultadoFinanceiro.id)
      .subscribe(result => this.closeModal());
  }
}

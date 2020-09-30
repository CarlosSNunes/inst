import { Component, OnInit } from '@angular/core';
import { FormControlError } from 'src/utils/form-control-error';
import { AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { ResultadoFinanceiroUpdateModel } from 'src/models/resultado-financeiro/resultado-financeiro-update.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResultadoFinanceiroService } from '../resultado-financeiro.service';
import { ResultadoFinanceiroModel } from 'src/models/resultado-financeiro/resultado-financeiro.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as BulmaCalendar from 'src/assets/js/bulma-calendar';

@Component({
  selector: 'app-resultado-financeiro-edit',
  templateUrl: './resultado-financeiro-edit.component.html',
  styleUrls: ['./resultado-financeiro-edit.component.scss']
})
export class ResultadoFinanceiroEditComponent implements OnInit {
  resultadoFinanceiroForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  resultadoFinanceiro: ResultadoFinanceiroModel;
  optionsDate = {
    type: 'date',
    dateFormat: 'DD/MM/YYYY',
    displayMode: 'default',
    lang: 'pt',
    cancelLabel: 'Cancelar',
    clearLabel: 'Limpar',
    todayLabel: 'Hoje',
    nowLabel: 'Agora',
    validateLabel: 'Validar',
    color: 'dark',
    startDate: null
  };
  btnSubmitDisable = false;

  constructor(
    private resultadoFinanceiroService: ResultadoFinanceiroService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.getResultadoFinanceiro();
    this.createForm();
  }

  getResultadoFinanceiro() {
    const id = this.route.snapshot.paramMap.get('id');
    this.resultadoFinanceiroService
      .getById(id)
      .subscribe(resultado => {
        this.resultadoFinanceiro = resultado;

        if (resultado.dataCorte) {
          this.optionsDate.startDate = new Date(resultado.dataCorte);
        }

        BulmaCalendar.attach('#dataCorte', this.optionsDate);

        this.arquivoNome = resultado.nomePdf;

        this.updateForm();
      });
  }

  createForm() {
    this.resultadoFinanceiroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      ano: ['', [Validators.required]],
      dataCorte: ['', []],
      arquivo: ['']
    });
  }

  updateForm() {
    this.resultadoFinanceiroForm = this.fb.group({
      id: [this.resultadoFinanceiro.id, [Validators.required]],
      titulo: [this.resultadoFinanceiro.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      ano: [this.resultadoFinanceiro.ano, [Validators.required]],
      dataCorte: [this.resultadoFinanceiro.dataCorte],
      arquivo: ['']
    });
  }

  get f() {
    return this.resultadoFinanceiroForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resultadoFinanceiroForm.valid) {
      this.btnSubmitDisable = true;
      const dataCorteElement: any = document.querySelector('#dataCorte');

      const dataCorte: Date = dataCorteElement.bulmaCalendar.date.start;

      if (dataCorte) {
        this.resultadoFinanceiroForm.controls.dataCorte.setValue(dataCorte.toISOString());
      } else {
        this.resultadoFinanceiroForm.controls.dataCorte.setValue('');
      }

      const model = new ResultadoFinanceiroUpdateModel(this.resultadoFinanceiroForm.value);
      this.resultadoFinanceiroService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/resultado-financeiro']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  updateFileName(arquivos: any) {
    this.arquivoNome = 'Selecione um arquivo';
    this.arquivo = null;

    if (arquivos.length > 0) {
      this.arquivoNome = arquivos[0].name;
      this.arquivo = arquivos[0];
    }

    this.resultadoFinanceiroForm.controls.arquivo.setValue(this.arquivo);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}

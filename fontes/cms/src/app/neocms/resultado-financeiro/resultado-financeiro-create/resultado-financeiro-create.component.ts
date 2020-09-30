import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { FormControlError } from 'src/utils/form-control-error';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ResultadoFinanceiroService } from '../resultado-financeiro.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ResultadoFinanceiroCreateModel } from 'src/models/resultado-financeiro/resultado-financeiro-create.model';
import * as BulmaCalendar from 'src/assets/js/bulma-calendar';

@Component({
  selector: 'app-resultado-financeiro-create',
  templateUrl: './resultado-financeiro-create.component.html',
  styleUrls: ['./resultado-financeiro-create.component.scss']
})
export class ResultadoFinanceiroCreateComponent implements OnInit {
  resultadoFinanceiroForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
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
    color: 'dark'
  };
  btnSubmitDisable = false;

  constructor(
    private resultadoFinanceiroService: ResultadoFinanceiroService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    BulmaCalendar.attach('[type="date"]', this.optionsDate);
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.resultadoFinanceiroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      ano: ['', [Validators.required]],
      dataCorte: ['', []],
      arquivo: ['', [Validators.required]]
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

      const model = new ResultadoFinanceiroCreateModel(this.resultadoFinanceiroForm.value);
      this.resultadoFinanceiroService.post(model)
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

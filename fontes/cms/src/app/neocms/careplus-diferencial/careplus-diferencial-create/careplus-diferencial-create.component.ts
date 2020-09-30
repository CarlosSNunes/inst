import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusDiferencialService } from '../careplus-diferencial.service';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusDiferencialCreateModel } from 'src/models/careplus-diferencial/careplus-diferencial-create.model';

@Component({
  selector: 'app-careplus-diferencial-create',
  templateUrl: './careplus-diferencial-create.component.html',
  styleUrls: ['./careplus-diferencial-create.component.scss']
})
export class CareplusDiferencialCreateComponent implements OnInit {
  careplusDiferencialForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;

  constructor(
    private careplusDiferencialService: CareplusDiferencialService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.careplusDiferencialForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      subtitulo: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
      arquivo: ['', [Validators.required]]
    });
  }

  get f() {
    return this.careplusDiferencialForm.controls;
  }

  updateFileName(arquivos: any) {
    this.arquivoNome = 'Selecione um arquivo';
    this.arquivo = null;

    if (arquivos.length > 0) {
      this.arquivoNome = arquivos[0].name;
      this.arquivo = arquivos[0];
    }

    this.careplusDiferencialForm.controls.arquivo.setValue(this.arquivo);
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusDiferencialForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusDiferencialCreateModel(this.careplusDiferencialForm.value);
      this.careplusDiferencialService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/careplus-diferencial']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}

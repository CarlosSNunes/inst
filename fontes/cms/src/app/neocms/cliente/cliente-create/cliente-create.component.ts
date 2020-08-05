import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { ClienteService } from '../cliente.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ClienteCreateModel } from 'src/models/cliente/cliente-create.model';
import { FormControlError } from 'src/utils/form-control-error';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent implements OnInit {
  clienteForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.clienteForm = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
      arquivo: ['', [Validators.required]]
    });
  }

  get f() {
    return this.clienteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.clienteForm.valid) {
      this.btnSubmitDisable = true;

      const model = new ClienteCreateModel(this.clienteForm.value);
      this.clienteService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/cliente']);
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

    this.clienteForm.controls.arquivo.setValue(this.arquivo);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}

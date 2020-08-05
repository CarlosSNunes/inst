import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { ClienteService } from '../cliente.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { ClienteModel } from 'src/models/cliente/cliente.model';
import { ClienteUpdateModel } from 'src/models/cliente/cliente-update.model';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
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
  cliente: ClienteModel;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getCliente();
  }

  getCliente() {
    const id = this.route.snapshot.paramMap.get('id');

    this.clienteService.getById(id)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.arquivoNome = cliente.nomeImagem;
        this.updateForm();
      });
  }

  updateForm() {
    this.clienteForm = this.fb.group({
      id: [this.cliente.id, [Validators.required]],
      descricao: [this.cliente.descricao, [Validators.required, Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      arquivo: ['']
    });
  }

  createForm() {
    this.clienteForm = this.fb.group({
      descricao: ['', [Validators.maxLength(255), Validators.required, FormControlError.noWhitespaceValidator]],
      arquivo: ['']
    });
  }

  get f() {
    return this.clienteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.clienteForm.valid) {
      this.btnSubmitDisable = true;

      const model = new ClienteUpdateModel(this.clienteForm.value);
      this.clienteService.put(model)
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

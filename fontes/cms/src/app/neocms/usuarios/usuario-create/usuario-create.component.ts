import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit {
  usuarioForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  perfilCareplusList: any[];
  btnSubmitDisable = false;
  loaded = false;

  constructor( 
    private usuarioService: UsuarioService,
    private perfilService: CareplusPerfilService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getPerfilCareplus();
  }

  createForm() {
    this.usuarioForm = this.fb.group({
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
    return this.usuarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.usuarioForm.valid) {
      this.btnSubmitDisable = true;

      const model = new UsuarioModel(this.usuarioForm.value);
      this.usuarioService.post(model)
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

    this.usuarioForm.controls.arquivo.setValue(this.arquivo);
  }

  
  getPerfilCareplus() {
    this.perfilService.getAll()
      .subscribe(perfils => {
        this.loaded = true;
        this.perfilCareplusList = perfils;
      },
        error => {
          this.loaded = true;
        });
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }


}

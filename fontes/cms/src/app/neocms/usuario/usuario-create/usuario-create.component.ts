import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { UsuarioCreateModel } from '../../../../models/usuario/usuario-create.model';
import { CareplusPerfilCreateModel } from '../../../../models/careplus-perfil/careplus-perfil-create.model';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss'],
  providers: [CareplusPerfilService],
})

export class UsuarioCreateComponent implements OnInit {

  // ? --------- Configuração 'ng-wizard' ---------
  configUser: NgWizardConfig = {
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
    selected: 0,
    theme: THEME.dots
  };
  ngWizardService: any;

  // ? --------- Configuração 'DropDown' ---------
  dropdownOptions = [
    { id: 1, descricao: 'Admininstrador' },
    { id: 2, descricao: 'Editor' },
    { id: 3, descricao: 'Usuario' },
  ];

  userForm;
  btnSubmitDisable = false;
  submitted: boolean;
  perfilSelectedObject: { id: any, descricao: any }[];
  perfilName: string;
  perfils;
  perfilId: number;
  usuario: UserAuthenticateModel;
  loaded = false;
  careplusPerfils: CareplusPerfilCreateModel = {
    perfilId: null,
    descricao: null,
  };
  senhaErro = false;
  currentIndex = 0;
  perfisSelect;
  selectedDevice = null;
  private options: object = CareplusPerfilCreateModel;
  selectedQuantity = '10';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private careplusPerfilService: CareplusPerfilService,
    private usuarioService: UsuarioService,
  ) { }

  createForm() {
    this.userForm = this.fb.group({
      nome     : ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      email    : ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaHash: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaSalt: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      perfil   : [],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getPerfils();
  }

  async getPerfils() {
    this.careplusPerfilService
      .getAll().subscribe(
        perfis => {
          this.perfils = perfis;
        });
  }

  onPerfilChange() {
    const id = JSON.stringify(this.userForm.get('perfil').value);
    const idParse = JSON.parse(id) ;
    const desc = this.userForm.get('perfil').value;
    this.careplusPerfils = {
      perfilId: idParse,
      descricao: desc,
    };
    console.log(idParse);
  }

  async verificarSenha() {
    const senha = this.userForm.get('senhaHash').value;
    const senhaConfirma = this.userForm.get('senhaSalt').value;
    if (senha !== senhaConfirma || senhaConfirma !== senha) {
      this.senhaErro = true;
    } else {
      this.senhaErro = false;
    }
    return this.senhaErro;
  }

  async onSubmit() {
    this.verificarSenha();
    if (this.senhaErro === false) {
      this.submitted = true;
    }
    console.log(this.userForm);
    if (this.userForm.valid) {
      this.btnSubmitDisable = true;
      const model = new UsuarioCreateModel(this.userForm.value);
      this.usuarioService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/usuario']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  async getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

  async setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  async stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

}

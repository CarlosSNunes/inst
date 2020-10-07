import { UsuarioModel } from './../../../../models/usuario/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { CareplusPerfilModel } from '../../../../models/careplus-perfil/careplus-perfil.model';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { UsuarioCreateModel } from '../../../../models/usuario/usuario-create.model';


@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss'],
  providers: [CareplusPerfilService],
})
export class UsuarioCreateComponent implements OnInit {
  userForm;
  btnSubmitDisable: boolean = false;
  submitted: boolean;
  perfilSelectedObject: { id: any, descricao: any }[];
  perfilName: string;
  perfilId: number;
  usuarioPerfilObj: { id: number, descricao: string };
  usuario: UserAuthenticateModel;
  loaded: boolean = false;
  careplusPerfils: CareplusPerfilModel[] = [];
  senhaErro: boolean = false;

  //*Configuração 'ngx-select-dropdown'
  configSelect = {
    displayKey: "descricao",    /** se a matriz de objetos passou a chave a ser exibida, o padrão é:        @description */
    search: false,              /** true/false para a funcionalidade de pesquisa padronizada para:          @false */
    height: 'auto',             /** altura da lista, para ela mostrar uma rolagem, o padrão é:              @auto */
    placeholder: 'Selecione',   /** texto a ser exibido quando nenhum item é selecionado, o padrão é        @Select */
    moreText: 'mais',           /** texto a ser exibido quando mais de um item for selecionado, o padrão é  @More */
  }

  //*Configuração 'ng-wizard'
  configBanner: NgWizardConfig = {
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
    selected: 0,
    theme: THEME.dots
  };
  ngWizardService: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private careplusPerfilService: CareplusPerfilService,
    private usuarioService: UsuarioService,
  ) {


  }


  createForm() {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaHash: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaSalt: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      perfil: this.fb.array(
        [
          this.fb.group({
            id: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.required, Validators.maxLength(4000), FormControlError.noWhitespaceValidator]]
          })
        ],
        [Validators.required]
      ),
    })
  }

  get f() {
    return this.userForm.controls;
  }
  get perfil() {
    return this.userForm.get('perfil') as FormArray;
  }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getUsuarioPerfil();
  }



  async verificarSenha() {
    let senha = this.userForm.get('senhaHash').value;
    let senhaConfirma = this.userForm.get('senhaSalt').value;
    if (senha != senhaConfirma || senhaConfirma != senha) {
      this.senhaErro = true;
    }else{
      this.senhaErro = false;
    }
    return this.senhaErro;
  }

  onSubmit() {
    this.verificarSenha();
    if(this.senhaErro === false){
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

  async changeUsuarioPerfil(e) {
    this.perfilId = (e.value.id);
    this.perfilName = (e.value.descricao);
    let perfilSelectedObject =
      [{ 'id': this.perfilId, 'descricao': this.perfilName }];
    let obj = perfilSelectedObject;
    this.userForm.controls['perfil'].setValue(perfilSelectedObject);
  }

  getUsuarioPerfil() {
    this.careplusPerfilService
      .getAll()
      .subscribe(careplusPerfils => {
        this.loaded = true;
        this.careplusPerfils = careplusPerfils;
        console.log(this.careplusPerfils);
      })
      .add(() => this.loaded = true);
  }


  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

}

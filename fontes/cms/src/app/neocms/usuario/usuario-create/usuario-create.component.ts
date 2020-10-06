import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { CareplusPerfilModel } from '../../../../models/careplus-perfil/careplus-perfil.model';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';


@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit {
  userForm;
  submitted           : boolean;
  perfilSelectedObject: { id: any, descricao: any }[];
  perfil              : string;
  perfis              : CareplusPerfilModel[];
  perfilName          : any;
  perfilId            : any;
  usuarioPerfilObj    : { id: any, descricao: any }[];
  usuario             : UserAuthenticateModel;
  loaded              : boolean;
  perfilOptions       = { id: 'any', descricao: 'any' };


  //*Configuração 'ngx-select-dropdown'
  configSelect = {
    displayKey : "descricao",   /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search     : false,         /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height     : 'auto',        /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Selecione',   /** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText   : 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
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
    private fb                   : FormBuilder,
    private router               : Router,
    private authenticateService  : AuthenticationService,
    private careplusPerfilService: CareplusPerfilService,
    private usuarioService       : UsuarioService,
  ) { }


  createForm() {
    this.userForm = this.fb.group({
      nome: ['0', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      email: ['0', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaHash: ['0', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senhaSalt: ['0', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      perfil: ['0', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
    })
  }

  get f() {
    return this.userForm.controls;
  }


  ngOnInit() {
    debugger;
    this.usuario = this.authenticateService.state;
    // this.createForm();
    // this.getUsuarioPerfil();
  }

  onSubmit() {

  }

  changeUsuarioPerfil(e) {
    this.perfilId = JSON.stringify(e.value.id).replace(/['"]+/g, '');
    this.perfilName = JSON.stringify(e.value.descricao).replace(/['"]+/g, '');
    this.perfilSelectedObject = [
      { id: this.perfilId, descricao: this.perfilName }
    ];
    this.userForm.controls['usuarioPerfil'].setValue(this.usuarioPerfilObj);
    console.log(this.userForm.get('usuarioPerfil').value)
  }

  getUsuarioPerfil() {
    this.careplusPerfilService
      .getAll()
      .subscribe(perfis => {
        this.loaded = true;
        this.perfis = perfis;
      })
      .add(() => this.loaded = true);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }


}

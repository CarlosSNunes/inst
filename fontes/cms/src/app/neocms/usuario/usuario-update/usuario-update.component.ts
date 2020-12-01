import { CareplusPerfilModel } from './../../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { UsuarioCreateModel } from '../../../../models/usuario/usuario-create.model';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { UsuarioUpdateModel } from 'src/models/usuario/usuario-update.model';
import { stream } from 'xlsx/types';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})
export class UsuarioUpdateComponent implements OnInit {
  [x: string]: any;


  // ? --------- Configuração 'ng-wizard' ---------
  configUser: NgWizardConfig = {
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
    selected: 0,
    theme: THEME.dots
  };
  faUserShield = faUserShield;
  ngWizardService: any;
  prf89 = null;
  userForm;
  btnSubmitDisable = false;
  submitted: boolean;
  perfilName = '';
  perfilId = 0;
  usuario: UserAuthenticateModel;
  loaded = false;
  senhaErro = false;
  currentIndex = 0;
  perfisSelect;
  selectedDevice = null;
  selectedQuantity = '10';
  perfisForm: FormGroup;
  perfis: CareplusPerfilModel[] = [];
  usuarios: UsuarioModel[] = [];
  perfilCheck = false;
  error;
  selectedPerfil;
  messageError: boolean;

  dismissible = true;
  defaultAlerts: any[];
  alerts;
  userId: string;
  usuarioSelecionado: any;
  perfilSelecionado;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticateService: AuthenticationService,
    private careplusPerfilService: CareplusPerfilService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService

  ) {
  }


  ngOnInit() {
    this.getUsuario()
    this.getPerfis();
    this.createForm();
  }


  createForm() {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      email: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senha: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
      usuarioPerfil: ['', [Validators.required]]
    });
  }

  updateForm() {

    this.userForm = this.fb.group({
      nome: [this.usuarioSelecionado.nome, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      email: [this.usuarioSelecionado.email, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      senha: [this.usuarioSelecionado.SenhaHash, [Validators.required, FormControlError.noWhitespaceValidator]],
      usuarioPerfil: this.fb.group,
    });
    console.log(this.usuarioSelecionado)

  }



  get f() {
    return this.userForm.controls;
  }

  getUsuario() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioService
      .getById(id)
      .subscribe(user => {
        this.usuarioSelecionado = user;
        console.log(this.perfilSelecionado)
        this.updateForm();
      })

  }


  getPerfis() {
    this.usuario = this.authenticateService.state;
    this.careplusPerfilService
      .getAll()
      .subscribe(perfis =>
        this.perfis = perfis,

        error => {
          this.messageError = true;
          this.error = error.error.message;
          this.defaultAlerts = [
            {
              type: 'danger',
              msg: 'ERRO: ' + this.error,
            }
          ];
          this.alerts = this.defaultAlerts;

        });

  }


  get perfilControls() {
    return this.userForm.get('usuarioPerfil');
  }

  chancePerfil(perfil: CareplusPerfilModel) {
    this.addPerfil(perfil.id, perfil.descricao);
    console.log(perfil);
  }

  perfilChecked(event) {
    console.log(event);
    this.perfilCheck = true;
  }

  addPerfil(id: number, descricao: string) {
    this.perfilControls.setValue([{
      perfilId: id,
      descricao,
    }]
    );
  }

  onSubmit() {
    if (this.senhaErro === false) {
      this.submitted = true;
    }
    console.log(this.userForm);
    if (this.userForm.valid) {


      this.btnSubmitDisable = true;
      const model = new UsuarioUpdateModel(this.userForm.value);
      this.usuarioService.put(model)
        .subscribe(() => {
          this.toastrService.success('Post editado com sucesso!!!');
          this.router.navigate(['/neocms/posts-blog/index']);
        },
          error => {
            let message = '';
            if (error.error) {
              message = error.error.message || 'Erro Interno no servidor';
            } else {
              message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
          })
        .add(() => this.btnSubmitDisable = false);



    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
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

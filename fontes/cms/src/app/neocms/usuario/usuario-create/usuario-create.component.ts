import { CareplusPerfilModel } from './../../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { UsuarioCreateModel } from '../../../../models/usuario/usuario-create.model';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    styleUrls: ['./usuario-create.component.scss'],
    providers: [CareplusPerfilService],
})

export class UsuarioCreateComponent implements OnInit {

    faUserShield = faUserShield;
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
    perfilCheck = false;
    error;
    selectedPerfil;
    messageError: boolean;

    dismissible = true;
    defaultAlerts: any[];
    alerts;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticateService: AuthenticationService,
        private careplusPerfilService: CareplusPerfilService,
        private usuarioService: UsuarioService,
    ) { }

    createForm() {
        this.userForm = this.fb.group({
            nome: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            email: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            senha: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            usuarioPerfil: this.fb.group,
        });
    }

    get f() {
        return this.userForm.controls;
    }

    ngOnInit() {
        this.usuario = this.authenticateService.state;
        this.careplusPerfilService
            .getAll()
            .subscribe(perfis => this.perfis = perfis, error => {
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
        this.createForm();
    }

    get perfilControls() {
        return this.userForm.get('usuarioPerfil');
    }

    chancePerfil(perfil: CareplusPerfilModel) {
        this.addPerfil(perfil.id, perfil.descricao);
    }

    perfilChecked(event) {
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

        if (this.userForm.valid) {


            this.btnSubmitDisable = true;
            const model = new UsuarioCreateModel(this.userForm.value);
            this.usuarioService.post(model)
                .subscribe(() => {
                    this.router.navigate(['/neocms/usuario']);
                },
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

                    }

                )

        }
    }

    onClosed(dismissedAlert: any): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }



}

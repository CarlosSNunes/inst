import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from '../../../src/models/login.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserWaitingApprovalModel } from 'src/models/usuario/user-waiting-approval.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from '../neocms/usuario/usuario.service';
import { UsuarioCreateModel } from 'src/models/usuario/usuario-create.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    error;
    faEnvelope = faEnvelope;
    faLock = faLock;
    loginForm = new FormGroup({
        nomeUsuario: new FormControl('', [Validators.required]),
        senha: new FormControl('', [Validators.required])
    });
    submitted: boolean;
    modalRef: BsModalRef;
    @ViewChild('modalTemplate', { static: true }) modalTemplate: TemplateRef<any>;
    resultMessage: string;
    returnUrl: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private toastrService: ToastrService,
        private bsModal: BsModalService,
        private usuarioService: UsuarioService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.returnUrl) {
                this.returnUrl = params.returnUrl;
            }
        })
    }

    ngOnInit() {
    }

    get f() {
        return this.loginForm.controls;
    }

    async onSubmit() {
        this.submitted = true;
        this.error = null;

        if (this.loginForm.valid) {

            const loginModel = new LoginModel(this.loginForm.value);
            try {
                let response = await this.loginService.login(loginModel);
                if (response['code']) {
                    response = response as UserWaitingApprovalModel;
                    if (response.code == 2) {
                        this.toastrService.info(response.message);
                    }

                    if (response.code == 1) {
                        this.resultMessage = response.message;
                        this.modalRef = this.bsModal.show(this.modalTemplate, { class: 'modal-sm modal-dialog-centered' });
                    }
                } else {
                    localStorage.setItem('user_token', JSON.stringify(response));
                    this.goTo('neocms')
                }
            } catch (err) {
                this.error = err.error;
                this.toastrService.error(this.error.message);
            }
        }
    }

    async onRequestConfirm() {
        try {
            const userToSave: UsuarioCreateModel = new UsuarioCreateModel({
                nome: this.loginForm.value.nomeUsuario,
                nomeUsuario: this.loginForm.value.nomeUsuario,
            });
            await this.usuarioService.gerarRequisicaoUsuario(userToSave);
            this.toastrService.success('Solicitação de acesso gerada com sucesso!');
            this.modalRef.hide();
            this.loginForm.reset();
        } catch (error) {
            if (error && error.error && error.error.message)
                this.toastrService.error(error.error.message);
        }
    }

    onRequestCanceled() {
        this.modalRef.hide();
    }

    goTo(route) {
        if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
        } else {
            this.router.navigate([route]);
        }
    }
}

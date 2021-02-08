import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CategoriasService } from '../categorias.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CategoriasCreateModel } from 'src/models/categorias/categorias-create.model';
// import { NgWizardConfig, THEME } from 'ng-wizard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categorias-create',
    templateUrl: './categorias-create.component.html',
    styleUrls: ['./categorias-create.component.scss']
})
export class CategoriasCreateComponent implements OnInit {
    categoriasForm;
    faTimes = faTimes;
    faCheck = faCheck;
    faUpload = faUpload;
    faPlus = faPlus;
    submitted: boolean;
    usuario: UserAuthenticateModel;
    btnSubmitDisable = false;

s
    userPermission: string;

    constructor(
        private authenticateService: AuthenticationService,
        private categoriasService: CategoriasService,
        private fb: FormBuilder,
        private router: Router,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        if(this.userPermission == 'Visualizador'){
            this.router.navigate(['dashboard'])
        }
        this.usuario = this.authenticateService.state;
        this.createForm();
    }

    createForm() {
        this.categoriasForm = this.fb.group({
            titulo: [
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
                    Validators.maxLength(100),
                    FormControlError.noWhitespaceValidator
                ]
            ]
        });
    }

    get f() {
        return this.categoriasForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.categoriasForm.valid) {
            this.btnSubmitDisable = true;

            const model = new CategoriasCreateModel(this.categoriasForm.value);
            this.categoriasService.post(model)
                .subscribe(() => {
                    this.toastrService.success('Categoria cadastrada com sucesso!');
                    this.router.navigate(['/neocms/posts-blog/categorias/index']);
                },
                    (error) => {
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
        else{
            this.toastrService.error('É nessessário preencher todos os campos * do formulário');

        }
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

}

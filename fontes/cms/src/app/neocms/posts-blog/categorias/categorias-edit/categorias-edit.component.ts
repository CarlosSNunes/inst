import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from './../../../../../../src/models/user-authenticate.model';
import { AuthenticationService } from './../../../../../../src/app/authentication/authentication.service';
import { CategoriasService } from '../categorias.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControlError } from './../../../../../../src/utils/form-control-error';
import { CategoriasModel } from './../../../../../../src/models/categorias/categorias.model';
import { CategoriasUpdateModel } from './../../../../../../src/models/categorias/categorias-update.model';
// import { NgWizardConfig, THEME } from 'ng-wizard';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categorias-edit',
    templateUrl: './categorias-edit.component.html',
    styleUrls: ['./categorias-edit.component.scss']
})
export class CategoriasEditComponent implements OnInit {

    categoriasForm;
    faTimes = faTimes;
    faCheck = faCheck;
    faUpload = faUpload;
    faPlus = faPlus;
    submitted: boolean;
    btnSubmitDisable = false;
    usuario: UserAuthenticateModel;
    categoria: CategoriasModel;
    // //*Configuração 'ng-wizard'
    // config: NgWizardConfig = {
    //     selected: 0,
    //     theme: THEME.dots,
    //     toolbarSettings: {
    //         showNextButton: false,
    //         showPreviousButton: false
    //     }
    // };
    userPermission: string;

    constructor(
        private authenticateService: AuthenticationService,
        private categoriasService: CategoriasService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        if(this.userPermission == 'Visualizador'){
            this.router.navigate(['dashboard'])
        }
        this.usuario = this.authenticateService.state;
        this.createForm();
        this.getCategoria();
    }

    getCategoria() {
        const id = this.route.snapshot.paramMap.get('id');

        this.categoriasService
            .getById(id)
            .subscribe(categoria => {
                this.categoria = categoria;
                this.categoriasForm.patchValue(this.categoria);
                this.updateForm();
            });
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

    updateForm() {
        this.categoriasForm = this.fb.group({
            id: [this.categoria.id, [Validators.required]],
            titulo: [
                this.categoria.titulo,
                [
                    Validators.required,
                    Validators.maxLength(100),
                    FormControlError.noWhitespaceValidator
                ]
            ],
            descricao: [
                this.categoria.descricao,
                [
                    Validators.required,
                    Validators.maxLength(1000),
                    FormControlError.noWhitespaceValidator
                ]
            ],
        });
    }

    get f() {
        return this.categoriasForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.categoriasForm.valid) {
            this.btnSubmitDisable = true;

            const model = new CategoriasUpdateModel(this.categoriasForm.value);
            this.categoriasService.put(model)
                .subscribe(() => {
                    this.toastrService.success('Categoria editada com sucesso!');
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

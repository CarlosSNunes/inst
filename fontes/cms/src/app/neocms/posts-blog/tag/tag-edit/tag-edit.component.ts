import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from './../../../../../../src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TagService } from '../tag.service';
import { AuthenticationService } from './../../../../../../src/app/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from './../../../../../../src/utils/form-control-error';
import { TagCreateModel } from './../../../../../../src/models/tag/tag-create.model';
import { TagModel } from './../../../../../../src/models/tag/tag.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tag-edit',
    templateUrl: './tag-edit.component.html',
    styleUrls: ['./tag-edit.component.scss']
})

export class TagEditComponent implements OnInit {
    tagForm;
    faTimes = faTimes;
    faCheck = faCheck;
    faUpload = faUpload;
    faPlus = faPlus;
    submitted: boolean;
    usuario: UserAuthenticateModel;
    tag: TagModel;
    tagResult: { id: number; descricao: string; dataCadastro: Date; usuarioId: number; selected: boolean; };
    userPermission: string;

    constructor(
        private tagService: TagService,
        private fb: FormBuilder,
        private router: Router,
        private authenticateService: AuthenticationService,
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
        this.getTag();
    }

    getTag() {
        const id = this.route.snapshot.paramMap.get('id');
        this.tagService
            .getById(id)
            .subscribe(tag => {
                this.tag = tag;
                this.tagForm.patchValue(this.tag);
                this.updateForm();
            });

    }

    createForm() {
        this.tagForm = this.fb.group({
            id: ['', [Validators.required]],
            descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        });
    }

    updateForm() {
        this.tagForm = this.fb.group({
            id: [this.tag['result'].id, [Validators.required]],
            descricao: [this.tag['result'].descricao, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
        });
    }

    get f() {
        return this.tagForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.tagForm.valid) {
            const tagsToUpdate = [];
            tagsToUpdate.push(new TagCreateModel(this.tagForm.value));
            this.tagService.put(tagsToUpdate)
                .subscribe(() => {
                    this.router.navigate(['/neocms/posts-blog/tag']);
                    this.toastrService.success('Tag editada com sucesso!!');
                }, (error) => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                });
        }
    }

    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

}

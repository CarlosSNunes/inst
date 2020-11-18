import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from './../../../../../../src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TagService } from '../tag.service';
import { AuthenticationService } from './../../../../../../src/app/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from './../../../../../../src/utils/form-control-error';
import { TagCreateModel } from './../../../../../../src/models/tag/tag-create.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tag-create',
    templateUrl: './tag-create.component.html',
    styleUrls: ['./tag-create.component.scss']
})
export class TagCreateComponent implements OnInit {
    tagForm;
    faTimes = faTimes;
    faCheck = faCheck;
    faUpload = faUpload;
    faPlus = faPlus;
    submitted: boolean;
    usuario: UserAuthenticateModel;

    constructor(
        private tagService: TagService,
        private fb: FormBuilder,
        private router: Router,
        private authenticateService: AuthenticationService,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {
        this.usuario = this.authenticateService.state;

        this.createForm();
    }

    createForm() {
        this.tagForm = this.fb.group({
            tags: this.fb.array([
                this.fb.group({
                    descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
                })
            ])
        });
    }

    get f() {
        return this.tagForm.controls;
    }

    get tags() {
        return this.f.tags;
    }

    addTag() {
        this.tags.push(
            this.fb.group({
                descricao: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            })
        );
    }

    removeTag(index: number) {
        this.tags.removeAt(index);
    }

    onSubmit() {
        this.submitted = true;
        if (this.tagForm.valid) {
            const tagsToCreate = [];
            this.tags.controls.forEach(tag => {
                tagsToCreate.push(new TagCreateModel(tag.value));
            });

            this.tagService.post(tagsToCreate)
                .subscribe(() => {
                    this.toastrService.success('Tag criada com sucesso!!');
                    this.router.navigate(['/neocms/posts-blog/tag'])
                },
                    (error) => {
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

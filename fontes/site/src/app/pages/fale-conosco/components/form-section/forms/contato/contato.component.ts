import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { DropDownItem } from 'src/app/models';
import { Types } from './data/mock-data'
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService } from 'src/app/services';
import { filterFormFields } from './utils/mount-form';
import { FeedbackModalModel } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
declare var grecaptcha: any;

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
    contatoForm: FormGroup;
    types: DropDownItem<number>[] = [];
    defaultType = new DropDownItem<number>({
        key: 'Selecione...',
        value: undefined
    });
    subjects: DropDownItem<number>[] = [];
    defaultSubject = new DropDownItem<number>({
        key: 'Selecione...',
        value: undefined
    });
    files: File[] = [];
    filesNumber: number = 0;
    filerHelper = FileHelper;
    formFields: any = filterFormFields(1);
    captchaRendered: boolean = false;
    validCaptcha: boolean = false;
    isBrowser: boolean = false;

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService,
        private modalService: ModalService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
        this.mountForm();
        this.formFields = filterFormFields(1);
    }

    ngOnInit() {
        Types.TipoAssunto.map(tipoAssunto => {
            this.types.push(new DropDownItem({
                key: tipoAssunto.Descricao,
                value: tipoAssunto.Id
            }));
        })
        if (this.isBrowser) {
            grecaptcha.reset();
        }
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            if (this.captchaRendered) {
                grecaptcha.reset();
            }
        }
    }

    selectType(type: DropDownItem<number>) {
        this.formFields = filterFormFields(type.value);
        this.subjects = [];
        this.defaultSubject = new DropDownItem<number>({
            key: 'Selecione...',
            value: undefined
        });
        const tipoAssunto = Types.TipoAssunto.find(tipo => tipo.Id == type.value);
        tipoAssunto.Assunto.map(assunto => {
            this.subjects.push(
                new DropDownItem({
                    key: assunto.Titulo,
                    value: assunto.Id
                })
            )
        });
        this.files = [];
        this.filesNumber = 0;
        this.changeFormStructureAndValidation();
        this.contatoForm.controls.IdTipo.setValue(type.value);
        this.contatoForm.controls.IdTipo.markAsTouched();
        if (!this.captchaRendered) {
            this.renderCapcha();
        }
    }

    private renderCapcha() {
        if (this.isBrowser) {
            this.captchaRendered = true;
            this.cdr.detectChanges();
            this.initRecaptcha();
        }
    }


    initRecaptcha() {
        let that = this
        setTimeout(function () {
            if (typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined') {
                that.initRecaptcha();
            } else {
                grecaptcha.render('captcha_element_contato', {
                    sitekey: '6LdULsMZAAAAAPGgoeLKfhIvt1pY9zg9iEhFO7eV',
                    callback: that.getCaptchaCallback.bind(that),
                    'error-callback': that.getCaptchaErrorCallback.bind(that),
                    'expired-callback': that.getCaptchaExpiredCallback.bind(that),
                });
            }
        }, 100)
    }

    selectSubject(subject: DropDownItem<number>) {
        this.contatoForm.controls.Assunto.setValue(subject.value);
        this.contatoForm.controls.Assunto.markAsTouched();
    }

    mountForm() {
        this.contatoForm = this.fb.group({
            Origem: ['Partner', Validators.compose([Validators.required])],
            Assunto: [, Validators.compose([Validators.required])],
            CPFCNPJ: [,],
            Certificado: [,],
            CodigoCarePlus: [,],
            Comentario: [, Validators.compose([Validators.required])],
            DDDTelefone1: [, Validators.compose([Validators.required])],
            Telefone1: [, Validators.compose([Validators.required, Validators.minLength(8)])],
            DDDTelefone2: [,],
            Telefone2: [, Validators.compose([Validators.minLength(8)])],
            Email: [, Validators.compose([Validators.email, Validators.required])],
            IdTipo: [, Validators.compose([Validators.required])],
            NomeContato: [,],
            NomeEntidade: [,],
            validCaptcha: [this.validCaptcha, Validators.compose([Validators.required, Validators.requiredTrue])]
            // lstAnexo não esquecer
        })
    }

    get form() {
        return this.contatoForm.controls;
    }

    getErrors(control: AbstractControl, fieldName?: string) {
        return FormControlError.GetErrors(control, fieldName);
    }

    changeFormStructureAndValidation() {
        this.mountForm();

        Object.keys(this.formFields).map(key => {
            if (this.contatoForm.controls[key]) {
                this.contatoForm.controls[key].setValidators(
                    this.formFields[key].validators
                )

                this.contatoForm.controls[key].markAsPristine();
                this.contatoForm.controls[key].markAsUntouched();
                this.contatoForm.controls[key].updateValueAndValidity();
            }
        });
    }

    fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            for (const file of fileInput.target.files) {
                const filesize = (((file as File).size / 1024) / 1024);
                if (filesize > 2) {
                    this.files = [];
                    this.notificationService.addNotification('error', `O arquivo ${file.name} não pode ter mais de 2MB`, 'bottom')
                    break;
                } else {
                    this.files.push(file)
                }
            };
            this.filesNumber = this.files.length;
        }
    }

    deleteFile(index: number) {
        this.files.splice(index, 1);
        this.filesNumber = this.files.length;
    }

    sendForm() {
        if (this.contatoForm.valid) {
            console.log('valid', this.contatoForm.value)

            const formValue = { ...this.contatoForm.value };

            if (!formValue.CodigoCarePlus) {
                formValue.CodigoCarePlus = 0;
            }

            if (!formValue.DDDTelefone2) {
                formValue.DDDTelefone2 = 0
            }

            if (!formValue.Telefone2) {
                formValue.Telefone2 = 0
            }

            const modal: FeedbackModalModel = new FeedbackModalModel();

            this.modalService.openModal(modal)
        } else {
            Object.keys(this.contatoForm.controls).map(control => {
                this.contatoForm.controls[control].markAsTouched();
            });
        }
    }

    /*
    * Recaptcha functions
    * 
    */
    getCaptchaErrorCallback(error) {
        console.error(error)
        this.contatoForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaExpiredCallback(error) {
        console.error(error)
        this.contatoForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaCallback(event) {
        this.validCaptcha = true;
        this.contatoForm.controls.validCaptcha.setValue(true)
    }

}

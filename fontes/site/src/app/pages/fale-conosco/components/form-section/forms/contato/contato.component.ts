import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { DropDownItem, GravarFaleConoscoEntrada } from 'src/app/models';
import { Types } from './data/mock-data'
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService } from 'src/app/services';
import { filterFormFields } from './utils/mount-form';
import { ErrorModalModel, FeedbackModalModel } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ScriptLoaderService } from 'src/app/services/script-loader/script-loader.service';
import { FaleConoscoService } from 'src/app/services/fale-conosco/fale-conosco.service';
import { Router } from '@angular/router';
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
        title: 'Selecione...',
        value: undefined
    });
    subjects: DropDownItem<number>[] = [];
    defaultSubject = new DropDownItem<number>({
        title: 'Selecione...',
        value: undefined
    });
    files: File[] = [];
    filesNumber: number = 0;
    filerHelper = FileHelper;
    formFields: any = filterFormFields(1);
    captchaRendered: boolean = false;
    validCaptcha: boolean = false;
    isBrowser: boolean = false;
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService,
        private modalService: ModalService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private scriptLoaderService: ScriptLoaderService,
        @Inject(DOCUMENT) private document: Document,
        private faleConoscoService: FaleConoscoService,
        private router: Router
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
        this.mountForm();
        this.formFields = filterFormFields(1);
    }

    ngOnInit() {
        Types.TipoAssunto.map(tipoAssunto => {
            this.types.push(new DropDownItem({
                title: tipoAssunto.Descricao,
                value: tipoAssunto.Id
            }));
        })
        if (this.isBrowser) {
            this.getTipoAssuntoContato();
            const capctchaElements = this.document.querySelectorAll('.g-recaptcha-bubble-arrow');
            if (typeof grecaptcha != 'undefined' && typeof grecaptcha.render != 'undefined' && capctchaElements.length > 0) {
                try {
                    grecaptcha.reset();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            const capctchaElements = this.document.querySelectorAll('.g-recaptcha-bubble-arrow');
            if (typeof grecaptcha != 'undefined' && typeof grecaptcha.render != 'undefined' && capctchaElements.length > 0) {
                try {
                    grecaptcha.reset();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    private async getTipoAssuntoContato() {
        try {
            const subjectTypes = await this.faleConoscoService.getListaTipoAssuntoFaleConosco();
            subjectTypes.TipoAssunto.forEach(subjectType => {
                this.types.push(new DropDownItem({
                    title: subjectType.Descricao,
                    value: subjectType.Id
                }));
            })

        } catch (error) {
            console.log(error)
        }
    }

    selectType(type: DropDownItem<number>) {
        this.formFields = filterFormFields(type.value);
        this.subjects = [];
        this.defaultSubject = new DropDownItem<number>({
            title: 'Selecione...',
            value: undefined
        });
        const tipoAssunto = Types.TipoAssunto.find(tipo => tipo.Id == type.value);
        tipoAssunto.Assunto.map(assunto => {
            this.subjects.push(
                new DropDownItem({
                    title: assunto.Titulo,
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
            this.cdr.detectChanges();
            this.initRecaptchaScript();
        }
    }

    initRecaptchaScript() {
        const scriptObj = this.document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=explicit"]');
        if (!scriptObj || scriptObj == null) {
            const script: Partial<HTMLScriptElement> = {
                src: 'https://www.google.com/recaptcha/api.js?render=explicit',
                async: true,
                defer: true,
                onload: this.initRecaptcha.bind(this)
            }
            this.scriptLoaderService.injectScript(script, 'head');
        } else {
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
                this.captchaRendered = true;
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
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
            aceiteDeTermos: [false, Validators.compose([Validators.required, Validators.requiredTrue])]
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

    async sendForm() {
        if (this.contatoForm.valid) {
            this.loading = true;
            const formValue = new GravarFaleConoscoEntrada({ ...this.contatoForm.value });

            if (!formValue.CodigoCarePlus) {
                formValue.CodigoCarePlus = 0;
            }

            if (!formValue.DDDTelefone2) {
                formValue.DDDTelefone2 = 0;
            }

            if (!formValue.Telefone2) {
                formValue.Telefone2 = 0;
            }

            delete formValue['validCaptcha'];
            delete formValue['aceiteDeTermos'];

            try {
                await this.faleConoscoService.gravarFaleConosco(formValue);

                this.contatoForm.reset();
                this.mountForm();

                this.loading = false;

                this.router.navigate(['/fale-conosco/contato/obrigado']);
            } catch (error) {
                const modal: ErrorModalModel = new ErrorModalModel();
                this.modalService.openModal(modal);
                this.loading = false;
            }
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

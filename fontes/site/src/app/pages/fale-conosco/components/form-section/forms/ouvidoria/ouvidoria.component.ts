import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ValidateBrService } from 'angular-validate-br';
import { DropDownItem } from 'src/app/models';
import { AssuntoOuvidoria, ClassificacaoOuvidoria } from './data/mock-data';
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService } from 'src/app/services';
import { FeedbackModalModel } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ScriptLoaderService } from 'src/app/services/script-loader/script-loader.service';
declare var grecaptcha: any;

@Component({
    selector: 'app-ouvidoria',
    templateUrl: './ouvidoria.component.html',
    styleUrls: ['./ouvidoria.component.scss']
})
export class OuvidoriaComponent implements OnInit, AfterViewInit {
    ouvidoriaForm: FormGroup;
    subjects: DropDownItem<number>[] = [];
    defaultSubject: DropDownItem<number> = new DropDownItem<number>({
        title: 'Selecione...',
        value: undefined
    });
    classifications: DropDownItem<number>[] = [];
    defaultClassification: DropDownItem<number> = new DropDownItem<number>({
        title: 'Selecione...',
        value: undefined
    });
    files: File[] = [];
    filesNumber: number = 0;
    filerHelper = FileHelper;
    isBrowser: boolean = false;

    constructor(
        private fb: FormBuilder,
        private validateBrService: ValidateBrService,
        private notificationService: NotificationService,
        private modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        @Inject(DOCUMENT) private document: Document,
        private scriptLoaderService: ScriptLoaderService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
        this.mountForm();
    }

    ngOnInit() {
        AssuntoOuvidoria.Dados.map(assunto => {
            this.subjects.push(new DropDownItem<number>({
                key: assunto.TextoAssunto,
                value: assunto.Id
            }))
        })

        ClassificacaoOuvidoria.Dados.map(classificacao => {
            this.classifications.push(new DropDownItem<number>({
                key: classificacao.TextoClassificacao,
                value: classificacao.Id
            }))
        })
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

    ngAfterViewInit() {
        if (this.isBrowser) {
            const capctchaElements = this.document.querySelectorAll('.g-recaptcha-bubble-arrow');
            if (typeof grecaptcha != 'undefined' && typeof grecaptcha.render != 'undefined' && capctchaElements.length > 0) {
                try {
                    grecaptcha.reset();
                } catch (error) {
                    console.log(error)
                }
            }
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
                grecaptcha.render('captcha_element_ouvidoria', {
                    sitekey: '6LdULsMZAAAAAPGgoeLKfhIvt1pY9zg9iEhFO7eV',
                    callback: that.getCaptchaCallback.bind(that),
                    'error-callback': that.getCaptchaErrorCallback.bind(that),
                    'expired-callback': that.getCaptchaExpiredCallback.bind(that),
                });
            }
        }, 100)
    }

    get form() {
        return this.ouvidoriaForm.controls;
    }

    getErrors(control: AbstractControl, fieldName?: string) {
        return FormControlError.GetErrors(control, fieldName);
    }

    private mountForm() {
        this.ouvidoriaForm = this.fb.group({
            Origem: ['Partner', Validators.compose([Validators.required])],
            // Certificado: [, Validators.compose([Validators.required])], // TODO ver com o cliente pois no site não há este campo mas ele é requisitado na documentação word e no xml
            DDDTelefoneCelular: [, Validators.compose([Validators.required])],
            TelefoneCelular: [, Validators.compose([Validators.required, Validators.minLength(8)])],
            DDDTelefoneResidencial: [,],
            TelefoneResidencial: [, Validators.compose([Validators.minLength(8)])],
            Email: [, Validators.compose([Validators.required, Validators.email])],
            IdAssunto: [, Validators.compose([Validators.required])],
            IdClassificacao: [, Validators.compose([Validators.required])],
            Mensagem: [, Validators.compose([Validators.required])],
            ProtocoloAtendimento: [,],
            NomeContato: [, Validators.compose([Validators.required])],
            CPFCNPJ: [, Validators.compose([Validators.required, this.validateBrService.cpf])],
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])]
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

    selectSubject(subject: DropDownItem<number>) {
        this.ouvidoriaForm.controls.IdAssunto.setValue(subject.value);
        this.ouvidoriaForm.controls.IdAssunto.markAsTouched();
    }

    selectClassification(subject: DropDownItem<number>) {
        this.ouvidoriaForm.controls.IdClassificacao.setValue(subject.value);
        this.ouvidoriaForm.controls.IdClassificacao.markAsTouched();
    }

    sendForm() {
        if (this.ouvidoriaForm.valid) {
            console.log('valid', this.ouvidoriaForm.value)

            const formValue = { ...this.ouvidoriaForm.value };

            delete formValue.Authorization;

            const modal: FeedbackModalModel = new FeedbackModalModel();

            this.modalService.openModal(modal)
        } else {
            Object.keys(this.ouvidoriaForm.controls).map(control => {
                this.ouvidoriaForm.controls[control].markAsTouched();
            });
        }
    }

    /*
    * Recaptcha functions
    *
    */
    getCaptchaErrorCallback(error) {
        console.error(error)
        this.ouvidoriaForm.controls.validCaptcha.setValue(false);
        grecaptcha.reset();
    }

    getCaptchaExpiredCallback(error) {
        console.error(error)
        this.ouvidoriaForm.controls.validCaptcha.setValue(false);
        grecaptcha.reset();
    }

    getCaptchaCallback(event) {
        this.ouvidoriaForm.controls.validCaptcha.setValue(true)
    }
}

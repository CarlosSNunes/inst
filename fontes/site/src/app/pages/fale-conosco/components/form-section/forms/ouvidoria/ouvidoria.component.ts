import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ValidateBrService } from 'angular-validate-br';
import { DropDownItem, ErrorModalModel, GravarOuvidoriaEntrada } from 'src/app/models';
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService, ModalService, ScriptLoaderService, FaleConoscoService } from 'src/app/services';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
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
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private validateBrService: ValidateBrService,
        private notificationService: NotificationService,
        private modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        @Inject(DOCUMENT) private document: Document,
        private scriptLoaderService: ScriptLoaderService,
        private faleConoscoService: FaleConoscoService,
        private router: Router,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.platformId)
        this.mountForm();
    }

    ngOnInit() {

        if (this.isBrowser) {
            this.getOuvidoriaSubjects();
            this.getOuvidoriaClassifications();
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

    private async getOuvidoriaSubjects() {
        try {
            const subjects = await this.faleConoscoService.buscarAssuntoOuvidoria();

            subjects.dados.forEach(subject => {
                this.subjects.push(new DropDownItem<number>({
                    title: subject.textoAssunto,
                    value: subject.id
                }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    private async getOuvidoriaClassifications() {
        try {
            const classifications = await this.faleConoscoService.buscarClassificacaoOuvidoria();
            classifications.dados.forEach(classification => {
                this.classifications.push(new DropDownItem<number>({
                    title: classification.textoClassificacao,
                    value: classification.id
                }));
            });

        } catch (error) {
            console.log(error)
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
            DDDTelefoneCelular: [, Validators.compose([Validators.required])],
            TelefoneCelular: [, Validators.compose([Validators.required, Validators.minLength(8)])],
            DDDTelefoneResidencial: [,],
            TelefoneResidencial: [, Validators.compose([Validators.minLength(8)])],
            Email: [, Validators.compose([Validators.required, Validators.email])],
            IdAssunto: [, Validators.compose([Validators.required])],
            IdClassificacao: [, Validators.compose([Validators.required])],
            Mensagem: [, Validators.compose([Validators.required])],
            ProtocoloAtendimento: [,],
            Nome: [, Validators.compose([Validators.required])],
            CPF: [, Validators.compose([Validators.required, this.validateBrService.cpf])],
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
            aceiteDeTermos: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
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

    async sendForm() {
        if (this.ouvidoriaForm.valid) {
            this.loading = true;

            const formValue = new GravarOuvidoriaEntrada({ ...this.ouvidoriaForm.value });

            if (this.files.length > 0) {
                formValue.Anexo = {
                    Arquivo: this.files
                }
            }

            if (!formValue.DDDTelefoneResidencial) {
                formValue.DDDTelefoneResidencial = 0;
            }

            if (!formValue.TelefoneResidencial) {
                formValue.TelefoneResidencial = 0;
            }

            delete formValue['validCaptcha'];
            delete formValue['aceiteDeTermos'];


            // Remove unused keys.
            Object.keys(formValue).forEach(objectKey => {
                if (formValue[objectKey] == null || formValue[objectKey] == undefined) {
                    delete formValue[objectKey];
                }
            });

            try {
                const response = await this.faleConoscoService.gravarOuvidoria(formValue);

                this.ouvidoriaForm.reset();
                this.mountForm();

                Object.keys(this.ouvidoriaForm.controls).forEach(control => {
                    this.ouvidoriaForm.controls[control].markAsUntouched();
                });
                this.loading = false;

                this.router.navigate([`/fale-conosco/ouvidoria/obrigado/${response.protocolo}`]);
            } catch (error) {
                const modal: ErrorModalModel = new ErrorModalModel();
                this.modalService.openModal(modal);
                this.loading = false;
            }

        } else {
            Object.keys(this.ouvidoriaForm.controls).forEach(control => {
                this.ouvidoriaForm.controls[control].markAsTouched();
            });
        }
    }

    private setSEOInfos() {
        this.title.setTitle('Ouvidoria | Fale Conosco | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Ouvidoria | Fale Conosco | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/assets/img/banner_home2.png`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/fale-conosco/ouvidoria`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Ouvidoria | Fale Conosco | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/assets/img/banner_home2.png`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Entre em contato com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/fale-conosco/ouvidoria`,
        });
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

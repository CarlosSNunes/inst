import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ValidateBrService } from 'angular-validate-br'
import { FileHelper } from 'src/utils/file-helper';
import { NotificationService, ModalService, ScriptLoaderService, FaleConoscoService } from 'src/app/services';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { GravarCanalDenunciaEntrada, ErrorModalModel } from 'src/app/models';
import { Router } from '@angular/router';
declare var grecaptcha: any;


@Component({
    selector: 'app-canal-de-denuncias',
    templateUrl: './canal-de-denuncias.component.html',
    styleUrls: ['./canal-de-denuncias.component.scss']
})
export class CanalDeDenunciasComponent implements OnInit, AfterViewInit {
    canalDeDenunciasForm: FormGroup;
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
        private scriptLoaderService: ScriptLoaderService,
        @Inject(DOCUMENT) private document: Document,
        private faleConoscoService: FaleConoscoService,
        private router: Router
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.mountForm();
    }

    ngOnInit() {
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
                grecaptcha.render('captcha_element_canal_de_denuncias', {
                    sitekey: '6LdULsMZAAAAAPGgoeLKfhIvt1pY9zg9iEhFO7eV',
                    callback: that.getCaptchaCallback.bind(that),
                    'error-callback': that.getCaptchaErrorCallback.bind(that),
                    'expired-callback': that.getCaptchaExpiredCallback.bind(that),
                });
            }
        }, 100)
    }

    private mountForm() {
        this.canalDeDenunciasForm = this.fb.group({
            Origem: ['Partner', Validators.compose([Validators.required])],
            // Token será preenchido pelo backend.
            CPFCNPJ: [, Validators.compose([this.validateBrService.cpf])],
            // Certificado: [,], // Verificar a utilização disto pois no site oficial não tem.
            Mensagem: [, Validators.compose([Validators.required, Validators.maxLength(4000)])],
            DDDTelefone: [, Validators.compose([Validators.minLength(1)])],
            Telefone: [, Validators.compose([Validators.minLength(8)])],
            // DDDTelefoneCel: [,], // Verificar a utilização disto pois no site oficial não tem.
            // TelefoneCel: [,], // Verificar a utilização disto pois no site oficial não tem.
            Email: [, Validators.compose([Validators.email])],
            NomeContato: [,],
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
            aceiteDeTermos: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
            Authorization: [false, Validators.compose([Validators.required, Validators.requiredTrue])]
        })
    }

    get form() {
        return this.canalDeDenunciasForm.controls;
    }

    getErrors(control: AbstractControl, fieldName?: string) {
        return FormControlError.GetErrors(control, fieldName);
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
        if (this.canalDeDenunciasForm.valid) {
            this.loading = true;

            const formValue = new GravarCanalDenunciaEntrada({ ...this.canalDeDenunciasForm.value });

            delete formValue['validCaptcha'];
            delete formValue['aceiteDeTermos'];
            delete formValue['Authorization'];


            // Remove unused keys.
            Object.keys(formValue).forEach(objectKey => {
                if (formValue[objectKey] == null || formValue[objectKey] == undefined) {
                    delete formValue[objectKey];
                }
            });

            try {

                await this.faleConoscoService.gravarCanalDeDenuncia(formValue);

                this.canalDeDenunciasForm.reset();
                this.mountForm();

                this.loading = false;

                this.router.navigate(['/fale-conosco/canal-de-denuncias/obrigado']);
            } catch (error) {
                const modal: ErrorModalModel = new ErrorModalModel();
                this.modalService.openModal(modal);
                this.loading = false;
            }
        } else {
            Object.keys(this.canalDeDenunciasForm.controls).forEach(control => {
                this.canalDeDenunciasForm.controls[control].markAsTouched();
            });
        }
    }

    /*
     * Recaptcha functions
     * 
     */
    getCaptchaErrorCallback(error) {
        console.error(error)
        this.canalDeDenunciasForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaExpiredCallback(error) {
        console.error(error)
        this.canalDeDenunciasForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaCallback(event) {
        this.canalDeDenunciasForm.controls.validCaptcha.setValue(true)
    }

}

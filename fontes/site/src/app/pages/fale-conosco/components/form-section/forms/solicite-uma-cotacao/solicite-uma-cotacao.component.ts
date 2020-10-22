import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { DropDownItem, FaleConoscoAutoFields } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ActivatedRoute } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ScriptLoaderService } from 'src/app/services/script-loader/script-loader.service';
declare var grecaptcha: any;
import { requireAtLeastOne } from '../utils/validators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-solicite-uma-cotacao',
    templateUrl: './solicite-uma-cotacao.component.html',
    styleUrls: ['./solicite-uma-cotacao.component.scss']
})
export class SoliciteUmaCotacaoComponent implements OnInit, AfterViewInit {
    dropDownItems: DropDownItem[] = [
        new DropDownItem({
            title: '2 a 29 vidas - Soho',
            value: 'careplus-soho'
        }),
        new DropDownItem({
            title: '30 a 200 vidas - Clube Care Plus',
            value: 'clube-careplus'
        }),
        new DropDownItem({
            title: '+ 200 vidas - Empresarial',
            value: 'careplus-empresarial'
        })
    ];
    selectedPlan: string = '';
    soliciteUmaCotacaoForm: FormGroup;
    faleConoscoAutoFiels: FaleConoscoAutoFields;
    isBrowser: boolean = false;
    formValueChangesSubscription: Subscription;
    retURL: string = `${environment.SELF_URL}fale-conosco/solicite-uma-cotacao/obrigado`;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private validateBrService: ValidateBrService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private scriptLoaderService: ScriptLoaderService,
        @Inject(DOCUMENT) private document: Document,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.soliciteUmaCotacaoForm = this.fb.group({
            plano: ['',],
            planoSaude: [0,],
            planoOdontologico: [0,],
            medicinaOcupacional: [0,],
            nome: ['', Validators.compose([Validators.required])],
            razaoSocial: ['', Validators.compose([Validators.required])],
            // cpf: ['', Validators.compose([Validators.required, this.validateBrService.cpf])],
            cnpj: ['', Validators.compose([Validators.required, this.validateBrService.cnpj])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            telefone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            mensagem: ['', Validators.compose([Validators.required])],
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
            aceiteDeTermos: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
        }, {
            validators: [
                requireAtLeastOne()
            ]
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.fillForm(params)
        });
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

    private setSEOInfos() {
        this.title.setTitle('Solicite uma Cotação | Fale Conosco | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Solicite uma cotação com a Care Plus pelo formulário ou por um dos nossos canais de atendimento.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Fale Conosco | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
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
            content: `${environment.SELF_URL}/fale-conosco/solicite-uma-cotacao`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Fale Conosco | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
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
            content: `${environment.SELF_URL}/fale-conosco/solicite-uma-cotacao`,
        });
    }

    checkboxChange(event, controlName) {
        if (event.target.checked) {
            this.soliciteUmaCotacaoForm.controls[controlName].setValue(1);
            event.target.value = 1;
        } else {
            this.soliciteUmaCotacaoForm.controls[controlName].setValue(0);
            event.target.value = 0;
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
                grecaptcha.render('captcha_element_solicite_uma_cotacao', {
                    sitekey: '6LdULsMZAAAAAPGgoeLKfhIvt1pY9zg9iEhFO7eV',
                    callback: that.getCaptchaCallback.bind(that),
                    'error-callback': that.getCaptchaErrorCallback.bind(that),
                    'expired-callback': that.getCaptchaExpiredCallback.bind(that),
                });
            }
        }, 100)
    }

    get form() {
        return this.soliciteUmaCotacaoForm.controls;
    }

    selectPlan(item: DropDownItem) {
        this.soliciteUmaCotacaoForm.controls.plano.markAsTouched();
        this.soliciteUmaCotacaoForm.controls.plano.setValue(item.value);
    }

    getErrors(control: AbstractControl, fieldName?: string) {
        return FormControlError.GetErrors(control, fieldName);
    }

    private fillForm(params) {
        let fields = { ...params }
        fields.planoOdontologico = (fields.planoOdontologico == 'true') ? 1 : 0;
        fields.medicinaOcupacional = (fields.medicinaOcupacional == 'true') ? 1 : 0;
        fields.planoSaude = (fields.planoSaude == 'true') ? 1 : 0;
        this.faleConoscoAutoFiels = new FaleConoscoAutoFields(fields);
        const item = this.dropDownItems.find(item => item.value === params.plano)
        if (item) {
            this.selectedPlan = item.title;
            this.soliciteUmaCotacaoForm.controls.plano.setValue(item.title);
            this.cdr.detectChanges();
        }
        this.soliciteUmaCotacaoForm.controls.planoSaude.setValue(this.faleConoscoAutoFiels.planoSaude);
        this.soliciteUmaCotacaoForm.controls.planoOdontologico.setValue(this.faleConoscoAutoFiels.planoOdontologico);
        this.soliciteUmaCotacaoForm.controls.medicinaOcupacional.setValue(this.faleConoscoAutoFiels.medicinaOcupacional);
    }

    sendForm(event) {
        if (this.soliciteUmaCotacaoForm.valid) {

            event.target.submit();

        } else {
            event.preventDefault();
            Object.keys(this.soliciteUmaCotacaoForm.controls).map(control => {
                this.soliciteUmaCotacaoForm.controls[control].markAsTouched();
            });
            return false;
        }
    }

    updateFormValidation() {
        if (this.soliciteUmaCotacaoForm.value.planoSaude || this.soliciteUmaCotacaoForm.value.planoOdontologico) {
            if (this.selectedPlan != '') {
                this.soliciteUmaCotacaoForm.controls.plano.setValue(this.selectedPlan)
            } else {
                this.soliciteUmaCotacaoForm.controls.plano.setValue('')
            }
            this.soliciteUmaCotacaoForm.controls.plano.setValidators(
                Validators.compose([Validators.required])
            );
            this.soliciteUmaCotacaoForm.controls.plano.updateValueAndValidity();

        } else {
            this.selectedPlan = '';
            this.soliciteUmaCotacaoForm.controls.plano.setValue('');
            this.soliciteUmaCotacaoForm.controls.plano.setValidators(null);
            this.soliciteUmaCotacaoForm.controls.plano.updateValueAndValidity();
            this.soliciteUmaCotacaoForm.controls.plano.markAsUntouched();
        }
    }

    /*
     * Recaptcha functions
     *
     */
    getCaptchaErrorCallback(error) {
        console.error(error)
        this.soliciteUmaCotacaoForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaExpiredCallback(error) {
        console.error(error)
        this.soliciteUmaCotacaoForm.controls.validCaptcha.setValue(false)
    }

    getCaptchaCallback(event) {
        this.soliciteUmaCotacaoForm.controls.validCaptcha.setValue(true)
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

        if (this.formValueChangesSubscription) {
            this.formValueChangesSubscription.unsubscribe();
            this.formValueChangesSubscription.remove(this.formValueChangesSubscription);
        }
    }

}

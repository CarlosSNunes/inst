import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DropDownItem, FaleConoscoAutoFields } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FormControlError } from 'src/utils/form-control-error';
import { ActivatedRoute } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { FeedbackModalModel } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var grecaptcha: any;

@Component({
    selector: 'app-solicite-uma-cotacao',
    templateUrl: './solicite-uma-cotacao.component.html',
    styleUrls: ['./solicite-uma-cotacao.component.scss']
})
export class SoliciteUmaCotacaoComponent implements OnInit, AfterViewInit {
    dropDownItems: DropDownItem[] = [
        new DropDownItem({
            key: '2 a 29 vidas - Soho',
            value: 'soho'
        }),
        new DropDownItem({
            key: '30 a 200 vidas - Clube Care Plus',
            value: 'clube-careplus'
        }),
        new DropDownItem({
            key: 'Mais de 200 vidas - Empresarial',
            value: 'empresarial'
        })
    ];
    defaultItem = new DropDownItem({
        key: 'Selecione...',
        value: ''
    });
    soliciteUmaCotacaoForm: FormGroup;
    faleConoscoAutoFiels: FaleConoscoAutoFields;
    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private validateBrService: ValidateBrService,
        private modalService: ModalService
    ) {
        this.soliciteUmaCotacaoForm = this.fb.group({
            plano: ['', Validators.compose([Validators.required])],
            planoSaude: new FormControl({ value: true, disabled: true }),
            planoOdontologico: [false,],
            planoMedicinal: [false,],
            nome: ['', Validators.compose([Validators.required])],
            razaoSocial: ['', Validators.compose([Validators.required])],
            cpf: ['', Validators.compose([Validators.required, this.validateBrService.cpf])],
            cnpj: ['', Validators.compose([Validators.required, this.validateBrService.cnpj])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            telefone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            mensagem: ['', Validators.compose([Validators.required])],
            validCaptcha: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.fillForm(params)
        });
    }

    ngAfterViewInit() {
        grecaptcha.render('captcha_element_solicite_uma_cotacao', {
            sitekey: '6LdULsMZAAAAAPGgoeLKfhIvt1pY9zg9iEhFO7eV',
            callback: this.getCaptchaCallback.bind(this),
            'error-callback': this.getCaptchaErrorCallback.bind(this),
            'expired-callback': this.getCaptchaExpiredCallback.bind(this),
        });
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
        this.defaultItem = new DropDownItem({
            key: 'Selecione...',
            value: ''
        });
        let fields = { ...params }
        fields.planoOdontologico = (fields.planoOdontologico == 'true');
        fields.planoMedicinal = (fields.planoMedicinal == 'true');
        fields.planoSaude = (fields.planoSaude == 'true');
        this.faleConoscoAutoFiels = new FaleConoscoAutoFields(fields);
        const item = this.dropDownItems.find(item => item.value === params.plano)
        if (item) {
            this.defaultItem = item;
            this.soliciteUmaCotacaoForm.controls.plano.setValue(item.value);
            this.cdr.detectChanges();
        }
        this.soliciteUmaCotacaoForm.controls.planoOdontologico.setValue(this.faleConoscoAutoFiels.planoOdontologico);
        this.soliciteUmaCotacaoForm.controls.planoMedicinal.setValue(this.faleConoscoAutoFiels.planoMedicinal);
    }

    sendForm() {
        if (this.soliciteUmaCotacaoForm.valid) {
            console.log('valid', this.soliciteUmaCotacaoForm.value)

            const modal: FeedbackModalModel = new FeedbackModalModel();

            this.modalService.openModal(modal)
        } else {
            Object.keys(this.soliciteUmaCotacaoForm.controls).map(control => {
                this.soliciteUmaCotacaoForm.controls[control].markAsTouched();
            });
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
        grecaptcha.reset();
    }

}

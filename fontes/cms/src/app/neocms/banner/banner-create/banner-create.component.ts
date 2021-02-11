import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPhotoVideo, faPlus, faSearch, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NgWizardConfig } from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from '../banner.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { BannerCreateModel } from './../../../../../src/models/banner/banner-create.model';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { FormControlError } from './../../../../../src/utils/form-control-error';

@Component({
    selector: 'app-banner-create',
    templateUrl: './banner-create.component.html',
    styleUrls: ['./banner-create.component.scss'],
})

export class BannerCreateComponent implements OnInit {

    // ?--------- Configuração 'ng-wizard' ---------
    configBannerWin1: NgWizardConfig = {
        selected: 0,
        lang: {
            next: 'Avançar',
            previous: 'Voltar'
        },
        anchorSettings: {
            enableAllAnchors: true
        }
    };

    // ?--------- Configuração 'DropDown' ---------
    dropdownOptions = [
        { nome: 'home', descricao: 'Home' },
        { nome: 'beneficiario', descricao: 'Beneficiario' },
        { nome: 'rh', descricao: 'RH' },
        { nome: 'corretor', descricao: 'Corretor' },
        { nome: 'credenciado', descricao: 'Credenciado' },
        { nome: 'blog', descricao: 'Care Plus +' },
        { nome: 'diferenciais', descricao: 'Diferenciais' },
    ];

    areaDescricao: any;
    areaNome: any;
    areaSelecImagem: string;
    areaSelectedObject: [
        {
            nome: string,
            descricao: string
        }];
    arquivo: File;
    arquivoMobile: File;
    bannerForm: any;
    blob: File;
    btnSubmitDisable: any = false;
    croppedImage: any;
    croppedImageMobile: any;
    faCheck: any = faCheck;
    faPhotoVideo: any = faPhotoVideo;
    faPlus: any = faPlus;
    faSearch: any = faSearch;
    faTimes: any = faTimes;
    faUpload: any = faUpload;
    file: ImageData;
    fileName: string;
    fileNameMobile: string;
    filestring: string;
    imageChangedEvent: any;
    imageChangedEventMobile: any;
    imageURL: string;
    isBannerAtivo: any = false;
    isLinkExternoSelected: any = false;
    nomeDaImagem: any;
    submitted: boolean;
    thumbnailImage: File;
    usuario: UserAuthenticateModel;
    userPermission: string;

    constructor(
        private bannerService: BannerService,
        private fb: FormBuilder,
        private router: Router,
        private authenticateService: AuthenticationService,
        private toastrService: ToastrService
    ) {
    }

    /**
   * @description Criação do FormGroup
   * @memberOf BannerCreateComponent
   */
    createForm() {
        this.bannerForm = this.fb.group({
            nomeImagem: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
            area: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            tempoExibicao: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            rota: [''],
            link: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            linkExterno: ['0', [ FormControlError.noWhitespaceValidator]],
            nomeLink: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
            arquivo: ['', [Validators.required]],
            arquivoMobile: ['', [Validators.required]],
        });
    }

    /**
    * @description Retorna o FormControl
    * @memberOf BannerCreateComponent
    * @returns {f} Form.Control
    */
    get f() {
        return this.bannerForm.controls;
    }

    /**
     * @description Metodo de inicialização do componente
     * @memberOf BannerCreateComponent
     */
    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;
        if (this.userPermission == 'Visualizador') {
            this.router.navigate(['dashboard'])
        }
        this.usuario = this.authenticateService.state;
        this.createForm();
    }

    /**
     * @description Metodo que submete o formulário de cadastro de Banners
     * @memberOf BannerCreateComponent
     */
    onSubmit(): void {
        this.submitted = true;
        if (this.bannerForm.valid && (this.bannerForm.controls.link.value != '' || this.bannerForm.controls.rota.value != '')) {
            this.btnSubmitDisable = true;
            const model = new BannerCreateModel(this.bannerForm.value);
            this.bannerService.post(model)
                .subscribe(() => {
                    this.router.navigate(['/posts-blog/index']);
                    this.toastrService.success('Banner cadastrado com sucesso!!')
                }, (error) => {
                    let message = '';
                    if (error.error) {
                        message = error.error.message || 'Erro Interno no servidor';
                    } else {
                        message = error.message || 'Erro Interno';
                    }
                    this.toastrService.error(message);
                })
                .add(() => this.btnSubmitDisable = false);
        }else{
            this.toastrService.error('É nessessário preencher todos os campos * do formulário');

        }
    }

    /**
     * @description Define o tipo do link (Externo ou Interno)
     * @param value 
     * @param selected 
     * @memberOf BannerCreateComponent
     */
    changeLinkExterno(value: string, selected: boolean) {
        this.f.linkExterno.setValue(value);
        this.isLinkExternoSelected = selected;
    }

    /**
     * @description Define o status do banner (Ativo ou Inativo)
     * @param value 
     * @param selected 
     * @memberOf BannerCreateComponent
     */
    changeStatusBanner(value: string, selected: boolean) {
        this.f.ativo.setValue(value);
        this.isBannerAtivo = selected;
    }

    /**
     * @description Esse metodo dispara o erro de validação no form
     * @param control 
     * @memberOf BannerCreateComponent
     */
    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }



    /**
     ** Instruções para usar o 'ngx-image-cropper'
     *  Quando você escolhe um arquivo da entrada do arquivo, ele será acionado @fileChangeEvent
     *  Esse evento é então passado para o cortador de imagens, por meio do @imageChangedEvent qual
     *  carregará a imagem no cortador. Sempre que você soltar o mouse, o @imageCropped evento será
     *  disparado com a imagem cortada como uma string Base64 em sua carga útil.
     */

    /**
     * @description: Metodo que captura o evento, quando escolhe um arquivo da entrada do arquivo
     * @param {*} event
     * @memberOf BannerCreateComponent
     */
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.fileName = event.target.files[0].name;
    }

    /**
     * @description: Metodo que captura o evento, quando escolhe um arquivo da entrada do arquivo
     * @param {any} event
     * @memberOf BannerCreateComponent
     */
    fileChangeEventMobile(event): void {
        this.imageChangedEventMobile = event;
        this.fileNameMobile = 'small-' + event.target.files[0].name;
    }

    /**
     * @description Evento que será disparado com a imagem cortada como uma string Base64 em sua carga útil.
     * @param {any} event
     * @memberOf BannerCreateComponent
     */
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        const img = base64ToFile(event.base64);
        const contentType = 'image/png';
        const blob = new Blob([img], { type: contentType });
        const file = new File([blob], this.fileName, { type: contentType, lastModified: Date.now() });
        this.bannerForm.controls.arquivo.setValue(file);
    }

    /**
     * @description Método para Converter arquivo Blob gerado no @imageCropped no tipo File
     * @method blobToFile
     * @memberOf BannerCreateComponent
     */
    imageCroppedMobile(event: ImageCroppedEvent) {
        this.croppedImageMobile = event.base64;
        const img = base64ToFile(event.base64);
        const contentType = 'image/png';
        const blob = new Blob([img], { type: contentType });
        const file = new File([blob], this.fileNameMobile, { type: contentType, lastModified: Date.now() });
        this.bannerForm.controls.arquivoMobile.setValue(file);
    }

    imageLoaded() { }

    cropperReady() { }

    loadImageFailed() { }

}



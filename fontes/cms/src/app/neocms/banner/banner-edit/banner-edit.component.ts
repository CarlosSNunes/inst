import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { BannerUpdateModel } from './../../../../../src/models/banner/banner-update.model';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BannerService } from '../banner.service';
import { BannerModel } from './../../../../../src/models/banner/banner.model';
import { NgWizardConfig} from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-banner-edit',
    templateUrl: './banner-edit.component.html',
    styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {

    // ?--------- Configuração 'ng-wizard' ---------
    configBannerWin1: NgWizardConfig = {
        selected: 0,
        lang: {
            next: 'Avançar',
            previous: 'Voltar'
        },
        anchorSettings:{
            enableAllAnchors:true
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
    areaSelectedObject: [{
        nome: string,
        descricao: string
    }];
    arquivo: any = File;
    arquivoMobile: any = File;
    arquivoNome: any = 'Selecione um arquivo';
    arquivoNomeMobile: any = 'Selecione um arquivo';
    banner: BannerModel;
    bannerForm: FormGroup;
    bannerGrande: File;
    bannerMobile: File;
    btnSubmitDisable: any = false;
    croppedImage: string;
    croppedImageMobile: string;
    faCheck = faCheck;
    faPlus = faPlus;
    faTimes = faTimes;
    faUpload = faUpload;
    fileName: any;
    fileNameMobile: string;
    imageChangedEvent: any;
    imageChangedEventMobile: any;
    isBannerAtivo: any = false;
    isLinkExternoSelected: any = false;
    nomeDaImagem: any;
    submitted: boolean;
    usuario: UserAuthenticateModel;
    bannerResult;
    fileUpDesk: File;
    fileUpMobile: any;
    bannerCount: number;
    userPermission: string;

    constructor(
        private bannerService: BannerService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authenticateService: AuthenticationService,
        private route: ActivatedRoute,
        private toastrService: ToastrService,
    ) {



    }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;

        if(this.userPermission == 'Visualizador'){
            this.router.navigate(['dashboard'])
        }
        this.createForm();
        this.getBanner();
    }

    imageLoaded() { }
    cropperReady() { }
    loadImageFailed() { }


    /**
     * @description Metodo retorna a consula de banner por Id.
     * @memberOf BannerEditComponent
     */
    getBanner() {
        const id = this.route.snapshot.paramMap.get('id');
        this.bannerService.getById(id)
            .subscribe(banner => {
                this.bannerResult = banner;
                this.bannerForm.patchValue(this.bannerResult);
                this.updateForm();
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

    /**
     * @description Metodo que cria formulário para GET do Banner
     * @memberOf BannerEditComponent
     */
    createForm() {
        this.bannerForm = this.fb.group({
            id: [''],
            nomeImagemDesktop: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
            subtitulo: ['', [Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
            area: ['', [Validators.required,  FormControlError.noWhitespaceValidator]],
            tempoExibicao: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
            descricao: ['', [Validators.maxLength(150), FormControlError.noWhitespaceValidator]],
            rota: [''],
            link: ['',[ Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
            linkExterno: ['0', [ FormControlError.noWhitespaceValidator]],
            ativo: ['1', [Validators.required, FormControlError.noWhitespaceValidator]],
            arquivo: [''],
            arquivoMobile: ['']
        });
    }

    /**
     * @description Metodo que cria formulário para PUT do Banner
     * @memberOf BannerEditComponent
     */
    updateForm() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.bannerForm = this.fb.group({

            id: [id],
            nomeImagemDesktop: [this.bannerResult.nomeImagemDesktop, Validators.compose([Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator])],
            titulo: [this.bannerResult.titulo, Validators.compose([Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator])],
            subtitulo: [this.bannerResult.subtitulo, Validators.compose([Validators.maxLength(100), FormControlError.noWhitespaceValidator])],
            area: [this.bannerResult.area, Validators.compose([Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator])],
            tempoExibicao: [this.bannerResult.tempoExibicao, Validators.compose([Validators.maxLength(100), FormControlError.noWhitespaceValidator])],
            descricao: [this.bannerResult.descricao, Validators.compose([Validators.maxLength(255), FormControlError.noWhitespaceValidator])],
            rota: [this.bannerResult.rota,],
            link: [this.bannerResult.link,],
            nomeLink: [this.bannerResult.nomeLink, Validators.compose([Validators.required, FormControlError.noWhitespaceValidator])],
            linkExterno: [this.bannerResult.linkExterno, Validators.compose([Validators.required, FormControlError.noWhitespaceValidator])],
            ativo: [this.bannerResult.ativo, Validators.compose([Validators.required, FormControlError.noWhitespaceValidator])],
            arquivo: [,],
            arquivoMobile: [,]
        });
    }

    get f() {
        return this.bannerForm.controls;
    }

    /**
     * @description Evento que submete o formGroup
     * @memberOf BannerEditComponent
     */
    onSubmit() {
        this.submitted = true;
        if (this.bannerForm.valid && (this.bannerForm.controls.link.value != '' || this.bannerForm.controls.rota.value != '')) {
            this.btnSubmitDisable = true;
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            this.bannerForm.controls['id'].setValue(id);
            const model = new BannerUpdateModel(this.bannerForm.value);
            this.bannerService.put(model)
                .subscribe(() => {
                    this.router.navigate(['/neocms/banner']);
                    this.toastrService.success('Banner editado com sucesso!')
                },
                    (error) => {
                        let message = '';
                        if (error.error) {
                            message = error.error.message || 'Erro Interno no servidor';
                        } else {
                            message = error.message || 'Erro Interno';
                        }
                        this.toastrService.error(message);
                    })
                .add(() => this.btnSubmitDisable = false);
        }
        else{
            this.toastrService.error('É nessessário preencher todos os campos * do formulário');
        }
    }

    /**
     * @description Evento disparado ao escolher um arquivo da entrada arquivo pelo input de upload
     * @param {arquivos}
     * @memberOf BannerEditComponent
     */
    updateFileName(arquivos: any) {
        this.arquivoNome = 'Selecione um arquivo';
        this.arquivo = null;

        if (arquivos.length > 0) {
            this.arquivoNome = arquivos[0].name;
            this.arquivo = arquivos[0];
        }

        this.bannerForm.controls.arquivo.setValue(this.arquivo);
        this.bannerForm.controls.nome.setValue(this.arquivoNome);
    }

    /**
     * @param {arquivos}
     * @memberOf BannerEditComponent
     */
    updateFileNameMobile(arquivos: any) {
        this.arquivoMobile = null;

        if (arquivos.length > 0) {
            this.arquivoNomeMobile = arquivos[0].name;
            this.arquivoMobile = arquivos[0];
        }
        this.bannerForm.controls.arquivoMobile.setValue(this.arquivoMobile);
    }

    /**
     * @description Metodo captura o estado do radiobutton de link externo do banner
     * @param {value}, {selected}
     * @memberOf BannerEditComponent
     */
    changeLinkExterno(value: string, selected: boolean) {
        this.f.linkExterno.setValue(value);
        this.isLinkExternoSelected = selected;
    }

    /**
     * @description Metodo captura o estado do radiobutton de status de ativacao do banner
     * @param {value}, {selected}
     * @memberOf BannerEditComponent
     */
    changeStatusBanner(value: string, selected: boolean) {
        this.f.ativo.setValue(value);
        this.isBannerAtivo = selected;
    }

    /**
     * @param {event}
     * @memberOf BannerEditComponent
     */
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.fileName = event.target.files[0].name;
        this.bannerForm.controls.nomeImagem.setValue(this.fileName)

    }

    /**
     * @param {event}
     * @memberOf BannerEditComponent
     */
    fileChangeEventMobile(event): void {
        this.imageChangedEventMobile = event;
        this.fileNameMobile = 'small-' + event.target.files[0].name;
    }

    /**
     * @param {control} control
     * @returns
     * @memberOf BannerEditComponent
     */
    getErrors(control: AbstractControl) {
        return FormControlError.GetErrors(control);
    }

    /**
     * @description Metodo que captuea a ação de selecionar etapa do wizard.
     * @param {StepChangedArgs}
     * @memberOf BannerEditComponent
     */



    /**
     * @description Metodo que captuea a ação de avançar do wizard.
     * @param {StepChangedArgs}
     * @memberOf BannerEditComponent
     */
    // stepChanged(args: StepChangedArgs) {
    // }

    /**
     *  Usando o 'ngx-image-cropper'
     *  Quando você escolhe um arquivo da entrada do arquivo, ele será acionado @fileChangeEvent
     *  Esse evento é então passado para o cortador de imagens, por meio do @imageChangedEvent qual
     *  carregará a imagem no cortador. Sempre que você soltar o mouse, o @imageCropped evento será
     *  disparado com a imagem cortada como uma string Base64 em sua carga útil.
     */

    /**
     * @description:Método para Converter
     * @method: blobToFile
     * @memberOf BannerCreateComponent
     */
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        const img = base64ToFile(event.base64);
        const contentType = 'image/png';
        const blob = new Blob([img], { type: contentType });
        this.fileUpDesk = new File([blob], this.fileName, { type: contentType, lastModified: Date.now() });
        this.bannerForm.controls.arquivo.setValue(this.fileUpDesk);
    }

    /**
     * @description:Método para Converter arquivo Blob gerado no @imageCropped no tipo File
     * @method: blobToFile
     * @memberOf BannerCreateComponent
     */
    imageCroppedMobile(event: ImageCroppedEvent) {
        this.croppedImageMobile = event.base64;
        const img = base64ToFile(event.base64);
        const contentType = 'image/png';
        const blob = new Blob([img], { type: contentType });
        this.fileUpMobile = new File([blob], this.fileNameMobile, { type: contentType, lastModified: Date.now() });
        this.bannerForm.controls.arquivoMobile.setValue(this.fileUpMobile);
    }

    /**
     * @description:Método para Converter
     * @method: blobToFile
     * @memberOf BannerCreateComponent
     */
    public blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return theBlob as File;
    }
}

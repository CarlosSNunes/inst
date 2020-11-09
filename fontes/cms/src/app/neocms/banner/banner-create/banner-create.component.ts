import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPhotoVideo, faPlus, faSearch, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NgWizardConfig, StepChangedArgs, THEME } from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
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
    theme: THEME.dots,
    lang: {
      next: '🠞',
      previous: '🠜'
    }
  };

  // ?--------- Configuração 'DropDown' ---------
  dropdownOptions = [
    { nome: 'Home Padrão', descricao: 'Banner superior da home princial' },
    { nome: 'Home RH', descricao: 'Banner da home do RH' },
    { nome: 'Home Credenciado', descricao: 'Banner da home de credenciamento' },
    { nome: 'Home Corretor', descricao: 'Banner da home do corretor' },
    { nome: 'Home Beneficiário', descricao: 'Banner da home de beneficiário' },
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
  bannerGrande: File;
  bannerMobile: File;
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
  fileMobile: Blob;
  fileName: string;
  fileNameMobile: string;
  filestring: string;
  imageChangedEvent: any;
  imageChangedEventMobile: any;
  imageURL: string;
  isBannerAtivo: any = false;
  isLinkExternoSelected: any = false;
  ngWizardService: any;
  nomeDaImagem: any;
  submitted: boolean;
  thumbnailImage: File;
  usuario: UserAuthenticateModel;

  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) {
  }

  /**
   * @description: Metodo de inicialização do componente
   * @memberOf   : BannerCreateComponent
   */
  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  /**
   * @description: Criação do FormGroup
   * @memberOf   : BannerCreateComponent
   */
  createForm() {
    this.bannerForm = this.fb.group({
      nomeImagem   : ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      titulo       : ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo    : ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      area         : ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      tempoExibicao: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao    : ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      rota         : ['', [Validators.required, FormControlError.noWhitespaceValidator]],
      linkExterno  : ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      ativo        : ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      arquivo      : ['', [Validators.required]],
      arquivoMobile: ['', [Validators.required]],
    });
  }

  /**
   * @description :Retorna o FormControl
   * @memberOf    :BannerCreateComponent
   * @returns:    {f} Form.Control
   */
  get f() {
    return this.bannerForm.controls;
  }

  /**
   * @description: Metodo que submete o formulário de cadastro de Banners
   * @memberOf   : BannerCreateComponent
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.bannerForm.valid) {
      this.btnSubmitDisable = true;
      const model = new BannerCreateModel(this.bannerForm.value);
      this.bannerService.post(model)
        .subscribe(() => {
          this.router.navigate(['/posts-blog/index']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  changeLinkExterno(value: string, selected: boolean) {
    this.f.linkExterno.setValue(value);
    this.isLinkExternoSelected = selected;
  }

  changeStatusBanner(value: string, selected: boolean) {
    this.f.ativo.setValue(value);
    this.isBannerAtivo = selected;
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  /**
   * *Usando o 'ngx-image-cropper'
   *  Quando você escolhe um arquivo da entrada do arquivo, ele será acionado @fileChangeEvent
   *  Esse evento é então passado para o cortador de imagens, por meio do @imageChangedEvent qual
   *  carregará a imagem no cortador. Sempre que você soltar o mouse, o @imageCropped evento será
   *  disparado com a imagem cortada como uma string Base64 em sua carga útil.
   */

  /**
   * @param: {*} event
   * @description: Metodo que captura o evento, quando escolhe um arquivo da entrada do arquivo
   * @memberOf BannerCreateComponent
   */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fileName = event.target.files[0].name;
  }

  /**
   * @param: {any} event
   * @memberOf BannerCreateComponent
   */
  fileChangeEventMobile(event): void {
    this.imageChangedEventMobile = event;
    console.log(this.imageChangedEventMobile.target.files[0]);
    this.fileNameMobile = 'small-' + event.target.files[0].name;
  }

  /**
   * @param: {any} event
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
   * @method: blobToFile
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

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
  }

  loadImageFailed() {
  }
}



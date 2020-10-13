import { Component, HostListener, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { UserAuthenticateModel } from './../../../../../src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus, faSearch, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '../banner.service';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { BannerCreateModel } from './../../../../../src/models/banner/banner-create.model';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss'],
})


export class BannerCreateComponent implements OnInit {

  // ?--------- Configuração 'ng-wizard' ---------
  configBannerWin: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    lang: { next: '🠞', previous: '🠜' }
  };
  ngWizardService: any;

  // ?--------- Configuração 'DropDown' ---------
  dropdownOptions = [
    { nome: 'Home Padrão', descricao: 'Banner superior da home princial' },
    { nome: 'Home RH', descricao: 'Banner da home do RH' },
    { nome: 'Home Credenciado', descricao: 'Banner da home de credenciamento' },
    { nome: 'Home Corretor', descricao: 'Banner da home do corretor' },
    { nome: 'Home Beneficiário', descricao: 'Banner da home de beneficiário' },
  ];

  bannerForm;
  faSearch = faSearch;
  faPhotoVideo = faPhotoVideo;
  imageChangedEvent: any;
  imageChangedEventMobile: any;
  croppedImage: any;
  croppedImageMobile: any;
  bannerGrande: File;
  bannerMobile: File;
  thumbnailImage: File;
  imageURL: string;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivoNomeMobile = 'Selecione um arquivo';
  submitted: boolean;
  usuario: UserAuthenticateModel;
  isLinkExternoSelected = false;
  btnSubmitDisable = false;
  isBannerAtivo = false;
  areaSelectedObject: [{ nome: string, descricao: string }];
  areaNome: any;
  areaDescricao: any;
  blob: File;
  nomeDaImagem: any;
  areaSelecImagem: string;
  file: ImageData;
  fileMobile: Blob;
  filestring: string;
  arquivo: File;
  arquivoMobile: File;
  fileName: string;
  fileNameMobile: string;
  FileTypeMobile: any;
  FileType: any;


  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  /**
   * @description: Criação do FormGroup
   * @memberOf BannerCreateComponent
   */
  createForm() {
    this.bannerForm = this.fb.group({
      nomeImagem: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      tempoExibicao: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      rota: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
      linkExterno: ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      arquivo: ['', [Validators.required]],
      arquivoMobile: ['', [Validators.required]],
    });
  }

  get f() {
    return this.bannerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.bannerForm.valid) {
      this.btnSubmitDisable = true;
      const model = new BannerCreateModel(this.bannerForm.value);
      this.bannerService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/banner']);
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



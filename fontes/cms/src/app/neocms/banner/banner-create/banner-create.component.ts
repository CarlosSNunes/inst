/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
import { Bounds } from 'ng2-img-cropper';
/**
 * * Copyright (c) 2020 - NEOTIX INTERNET AGENCY – LTDA.
 * * All rights reserved.
 * @ Author: Bruno Sábio
 * @ Create Time: 2020-09-20 16:54:14
 * @ Modified by: Your name
 * @ Modified time: 2020-09-26 02:45:34
 * @ Description:
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '../banner.service';
import { FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss'],
})


export class BannerCreateComponent implements OnInit {
  faSearch = faSearch;
  imageChangedEvent: any;
  imageChangedEventMobile: any;
  croppedImage: any;
  croppedImageMobile:any;
  bannerGrande: File;
  bannerMobile: File;
  thumbnailImage: File;

  bannerForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivoNomeMobile = 'Selecione um arquivo'
  submitted: boolean;
  usuario: UserAuthenticateModel;
  isLinkExternoSelected = false;
  btnSubmitDisable = false;
  isBannerAtivo = false;
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    lang: { next: 'Próximo', previous: 'Voltar' }
  };
  areas: any = [
    { id: '01', nome: 'Home Padrão', descricao: 'Banner superior da home princial' },
    { id: '02', nome: 'Home RH', descricao: 'Banner da home do RH' },
    { id: '02', nome: 'Home Credenciado', descricao: 'Banner da home de credenciamento' },
    { id: '02', nome: 'Home Corretor', descricao: 'Banner da home do corretor' },
    { id: '02', nome: 'Home Beneficiário', descricao: 'Banner da home de beneficiário' },
  ];
  areaSelected: any[] = this.areas[0];
  nomeDaImagem: string;
  ngWizardService: any;


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
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
      arquivo: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
      arquivoMobile: ['', [Validators.required, FormControlError.noWhitespaceValidator],],
    });
  }

  get f() {
    return this.bannerForm.controls;
  }



  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    formData.append('fileDesktop', this.bannerForm.get('arquivo').value);
    formData.append('fileMobile', this.bannerForm.get('arquivoMobile').value);
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


  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }



  /**
   ** Usando o 'ngx-image-cropper'
   *  Quando você escolhe um arquivo da entrada do arquivo, ele será acionado @fileChangeEvent 
   *  Esse evento é então passado para o cortador de imagens, por meio do @imageChangedEvent qual 
   *  carregará a imagem no cortador. Sempre que você soltar o mouse, o @imageCropped evento será 
   *  disparado com a imagem cortada como uma string Base64 em sua carga útil.
   */



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
 
  fileChangeEventMobile(event: any): void {
    this.imageChangedEventMobile = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageCroppedMobile(event: ImageCroppedEvent) {
    this.croppedImageMobile = event.base64;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
  }
  loadImageFailed() {
    // show message
  }


}

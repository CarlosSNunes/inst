/**
 * Copyright (c) 2020 - NEOTIX INTERNET AGENCY – LTDA.
 * @Author       : Bruno Sábio
 * @CreateTime   : 2020-09-20 16:54:14
 * @Modifiedby   : Bruno Sábio
 * @ModifiedTime : 2020-09-26 02:45:34
 **/
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '../banner.service';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  croppedImageMobile: any;
  bannerGrande: File;
  bannerMobile: File;
  thumbnailImage: File;
  imageURL: string;
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

  //*Configuração 'ng-wizard'
  configBanner: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    lang: { next: 'Próximo', previous: 'Voltar' }
  };
  ngWizardService: any;

  //*Configuração 'ngx-select-dropdown'
  configSelect = {
    displayKey: "nome",      /** se a matriz de objetos passou a chave a ser exibida, o padrão é: @description */
    search: false,           /** true/false para a funcionalidade de pesquisa padronizada para: @false */
    height: 'auto',          /** altura da lista, para ela mostrar uma rolagem, o padrão é: @auto */
    placeholder: 'Selecione',/** texto a ser exibido quando nenhum item é selecionado, o padrão é @Select */
    moreText: 'mais',        /** texto a ser exibido quando mais de um item for selecionado, o padrão é @More */
  }

  areaOptions = [
    { nome: 'Home Padrão', descricao: 'Banner superior da home princial' },
    { nome: 'Home RH', descricao: 'Banner da home do RH' },
    { nome: 'Home Credenciado', descricao: 'Banner da home de credenciamento' },
    { nome: 'Home Corretor', descricao: 'Banner da home do corretor' },
    { nome: 'Home Beneficiário', descricao: 'Banner da home de beneficiário' },
  ];
  areaSelectedObject: [{ nome: string, descricao: string }];
  areaNome: any;
  areaDescricao: any;
  blob: File;
  nomeDaImagem: any;
  areaSelecImagem: string;

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

  async changeAreaBanner(e) {
    this.areaNome = JSON.stringify(e.value.nome).replace(/['"]+/g, '');
    this.areaDescricao = JSON.stringify(e.value.descricao).replace(/['"]+/g, '');
    this.areaSelectedObject = [
      { nome: this.areaNome, descricao: this.areaDescricao }
    ];
    this.bannerForm.controls['area'].setValue(this.areaNome);
    console.log(this.bannerForm.get('area').value)
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
  // const base64String = event.base64;
  //   // Remove header
  //   let base64Image = base64String.split(';base64,').pop();
    

  //   fs.writeFileSync('image.png', base64Image, {encoding: 'base64'});
  //   console.log(fs)

    // const formData = new FormData();
    // formData.append('bannerGrande', this.bannerForm.get('arquivo'));
    // this.bannerForm.controls['arquivo'].setValue(this.blob.name);
   
  }

  createBlobImageFileAndShow(): void {
    // this.dataURItoBlob(this.base64String).subscribe((blob: Blob) => {
    //   const imageBlob: Blob = blob;
    //   const imageName: string = this.generateName();
    //   const imageFile: File = new File([imageBlob], imageName, {
    //     type: "image/jpeg"
    //   });
    //   this.generatedImage = window.URL.createObjectURL(imageFile);
    //   window.open(this.generatedImage);
    // });
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



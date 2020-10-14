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
import { parse } from 'querystring';
import { NgWizardConfig, StepChangedArgs, THEME } from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {

  //? --------- Configuração 'ng-wizard' ---------
  configBannerEdit: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    lang: { next: '🠞', previous: '🠜' }
  };
  ngWizardService: any;

  //? --------- Configuração 'DropDown' ---------
  dropdownOptions = [
    { nome: 'Home Padrão', descricao: 'Banner superior da home princial' },
    { nome: 'Home RH', descricao: 'Banner da home do RH' },
    { nome: 'Home Credenciado', descricao: 'Banner da home de credenciamento' },
    { nome: 'Home Corretor', descricao: 'Banner da home do corretor' },
    { nome: 'Home Beneficiário', descricao: 'Banner da home de beneficiário' },
  ];

  bannerForm: FormGroup;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivoNomeMobile = 'Selecione um arquivo';
  arquivo: File;
  arquivoMobile: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  isLinkExternoSelected = false;
  banner: BannerModel;
  btnSubmitDisable = false;
  isBannerAtivo = false;
  imageChangedEventMobile: any;
  imageChangedEvent: any;
  fileName: any;
  fileNameMobile: string;
  croppedImageMobile: string;
  croppedImage: string;
  areaSelectedObject: [{ nome: string, descricao: string }];
  nomeDaImagem: any;
  bannerMobile: File;
  bannerGrande: File;




  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getBanner();
  }

  getBanner() {
    const id = this.route.snapshot.paramMap.get('id');

    this.bannerService.getById(id)
      .subscribe(banner => {
        this.banner = banner;
        this.arquivoNome = banner.nomeImagem;
        this.arquivoNomeMobile = banner.nomeImagem;
        this.isLinkExternoSelected = this.banner.linkExterno === '0' ? false : true;
        this.isBannerAtivo = this.banner.ativo === Boolean(JSON.parse("0")) ? false : true;
        this.bannerForm.patchValue(this.banner);
        this.updateForm();
      });
  }

  createForm() {
    this.bannerForm = this.fb.group({
      id: [],
      nomeImagem: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      titulo: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      tempoExibicao: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: ['', [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      rota: ['', [Validators.required, FormControlError.noWhitespaceValidator]],
      linkExterno: ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
      arquivo: [''],
      arquivoMobile: ['']
    });
  }

  updateForm() {
    this.bannerForm = this.fb.group({
      id: [this.banner.id, [Validators.required]],
      nomeImagem: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      titulo: [this.banner.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [this.banner.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      area: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      tempoExibicao: ['', [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: [this.banner.descricao, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      rota: [this.banner.rota, [Validators.required, FormControlError.noWhitespaceValidator]],
      linkExterno: [this.banner.linkExterno, [Validators.required, FormControlError.noWhitespaceValidator]],
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator],],
      arquivo: [''],
      arquivoMobile: ['']
    });
  }

  get f() {
    return this.bannerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.bannerForm.valid) {
      this.btnSubmitDisable = true;
      const model = new BannerUpdateModel(this.bannerForm.value);
      this.bannerService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/banner']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  updateFileName(arquivos: any) {
    this.arquivoNome = 'Selecione um arquivo';
    this.arquivo = null;

    if (arquivos.length > 0) {
      this.arquivoNome = arquivos[0].name;
      this.arquivo = arquivos[0];
    }

    this.bannerForm.controls.arquivo.setValue(this.arquivo);
  }

  updateFileNameMobile(arquivos: any) {
    this.arquivoNomeMobile = 'Selecione um arquivo';
    this.arquivoMobile = null;

    if (arquivos.length > 0) {
      this.arquivoNomeMobile = arquivos[0].name;
      this.arquivoMobile = arquivos[0];
    }

    this.bannerForm.controls.arquivoMobile.setValue(this.arquivoMobile);
  }

  changeLinkExterno(value: string, selected: boolean) {
    this.f.linkExterno.setValue(value);
    this.isLinkExternoSelected = selected;
  }

  changeStatusBanner(value: string, selected: boolean) {
    this.f.ativo.setValue(value);
    this.isBannerAtivo = selected;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fileName = event.target.files[0].name;
  }

  fileChangeEventMobile(event): void {
    this.imageChangedEventMobile = event;
    console.log(this.imageChangedEventMobile.target.files[0]);
    this.fileNameMobile = 'small-' + event.target.files[0].name;
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
    let img = base64ToFile(event.base64);
    let contentType = 'image/png';
    var blob = new Blob([img], { type: contentType });
    var file = new File([blob], this.fileName, { type: contentType, lastModified: Date.now() });
    this.bannerForm.controls.arquivo.setValue(file);
  }

  /**
 * @description:Método para Converter arquivo Blob gerado no @imageCropped no tipo File
 * @method: blobToFile
 * @memberOf BannerCreateComponent
 */
  imageCroppedMobile(event: ImageCroppedEvent) {
    this.croppedImageMobile = event.base64;
    let img = base64ToFile(event.base64);
    let contentType = 'image/png';
    var blob = new Blob([img], { type: contentType });
    var file = new File([blob], this.fileNameMobile, { type: contentType, lastModified: Date.now() });
    this.bannerForm.controls.arquivoMobile.setValue(file);
  }

  /**
   * @description:Método para Converter
   * @method: blobToFile
   * @memberOf BannerCreateComponent
   */
  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
  }

  loadImageFailed() {
  }



}

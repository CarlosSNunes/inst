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
import { NgWizardConfig, StepChangedArgs, THEME } from 'ng-wizard';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss']
})
export class BannerEditComponent implements OnInit {

  // ?--------- Configuração 'ng-wizard' ---------
  configBannerEdit: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    lang: { next: '🠞', previous: '🠜' }
  };
  ngWizardService: any;

  // ?--------- Configuração 'DropDown' ---------
  dropdownOptions = [
    { nome: 'beneficiario', descricao: 'Beneficiario' },
    { nome: 'blog', descricao: 'Blog' },
    { nome: 'corretor', descricao: 'Corretor' },
    { nome: 'credenciado', descricao: 'Credenciado' },
    { nome: 'diferenciais', descricao: 'Diferenciais' },
    { nome: 'home', descricao: 'Home' },
    { nome: 'rh', descricao: 'RH' },
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
  bannerResult: BannerModel;
  fileUpDesk: File;
  fileUpMobile: any;
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
      });
  }

  /**
   * @description Metodo que cria formulário para GET do Banner
   * @memberOf BannerEditComponent
   */
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
      ativo: ['0', [Validators.required, FormControlError.noWhitespaceValidator]],
      arquivo: [''],
      arquivoMobile: ['']
    });
  }

  /**
   * @description Metodo que cria formulário para PUT do Banner
   * @memberOf BannerEditComponent
   */
  updateForm() {
    this.bannerForm = this.fb.group({
      id: [this.bannerResult.id, [Validators.required]],
      nomeImagem: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      titulo: [this.bannerResult.titulo, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      subtitulo: [this.bannerResult.subtitulo, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      area: [this.bannerResult.area, [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      tempoExibicao: [this.bannerResult.tempoExibicao, [Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: [this.bannerResult.descricao, [Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      rota: [this.bannerResult.rota, [Validators.required, FormControlError.noWhitespaceValidator]],
      linkExterno: [this.bannerResult.linkExterno, [Validators.required, FormControlError.noWhitespaceValidator]],
      ativo: [this.bannerResult.ativo, [Validators.required, FormControlError.noWhitespaceValidator]],
      arquivo: this.fileUpDesk[0],
      arquivoMobile: [this.fileUpMobile[0]]
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

    console.log(this.bannerForm);
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

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  /**
   * @description Metodo que captuea a ação de avançar do wizard.
   * @param {StepChangedArgs}
   * @memberOf BannerEditComponent
   */
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

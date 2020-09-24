import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from '../banner.service';
import { FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { BannerCreateModel } from 'src/models/banner/banner-create.model';
import { NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss'],

})

export class BannerCreateComponent implements OnInit {

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

  bannerMobile: any;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ]
    }
  };


  // Variáveis Cropper
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSample: any;
  bannerDesktopFile: File;
  bannerDesktopJson: object = {
    'lastModified': '',
    'name': '',
    'size': '',
    'type': '',
  };


  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private ngWizardService: NgWizardService,
  ) {
    this.cropperSettings = new CropperSettings();

    this.cropperSettings.canvasWidth  = 500;
    this.cropperSettings.canvasHeight  = 200;

    this.cropperSettings.width = 1920;
    this.cropperSettings.height = 720;

    this.cropperSettings.minWidth = 1920,
    this.cropperSettings.minHeight = 720

    this.cropperSettings.croppedWidth = 1920;
    this.cropperSettings.croppedHeight = 720;

    this.cropperSettings.noFileInput = false;

    this.cropperSettings.cropperClass = 'canvas-style'

    this.cropperSettings.dynamicSizing = false;
  
    this.data = {};
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
      arquivo: ['', [Validators.required]],
      arquivoMobile: ['', [Validators.required]]
    });
  }


  fileChangeListenerDesktop($event) {
    var image: any = new Image();
    const file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    if (file != null || file) {
      this.bannerDesktopFile = file;
      this.bannerDesktopJson = {
        'lastModified': file.lastModified,
        'name': file.name,
        'size': file.size,
        'type': file.type,
      }
      this.bannerForm['arquivo'].setValue(file);
      this.bannerForm['nomeImagem'].setValue(file.name);
    }
  }

  fileChangeListenerMobile($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
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


  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
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

}

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
import { Bounds, CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss'],

})


export class BannerCreateComponent implements OnInit {

  canvasDesktopAtivo = false;
  canvasMobileAtivo = false;
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



  @ViewChild('cropperDesktop', undefined) cropperDesktop: ImageCropperComponent;
  @ViewChild('cropperMobile', undefined) cropperMobile: ImageCropperComponent;
  dataDesktop: any;
  dataMobile: any;
  cropperSettings1: CropperSettings;
  cropperSettings2: CropperSettings;

  bannerDesktopFile: File;
  bannerMobileFile: File;

  nomeDaImagem: string;

  
  constructor(
    private bannerService: BannerService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,

  ) {
    this.cropperSettings1 = new CropperSettings();
    this.canvasMobileAtivo = true;
    this.cropperSettings1.keepAspect = false;
    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 250;
    this.cropperSettings1.croppedWidth = 1920;
    this.cropperSettings1.croppedHeight = 720;
    this.cropperSettings1.minWidth = 1920;
    this.cropperSettings1.minHeight = 720;
    this.cropperSettings1.width = 1920;
    this.cropperSettings1.height = 720;
    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings1.noFileInput = true;


    this.cropperSettings2 = new CropperSettings();
    this.canvasDesktopAtivo = true;
    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 250;
    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 150;
    this.cropperSettings2.minWidth = 200;
    this.cropperSettings2.minHeight = 150;
    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 150;
    this.cropperSettings2.noFileInput = true;



    this.dataDesktop = {};
    this.dataMobile = {};
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


  fileChangeListenerDesktop($event) {
    let imageDesktop: any = new Image();
    const fileDesktop = $event.target.files[0];
    let myReaderDesktop: FileReader = new FileReader();
    let that = this;
    myReaderDesktop.onloadend = function (loadEvent) {
      imageDesktop.src = loadEvent.target.result;
      that.cropperDesktop.setImage(imageDesktop);
    };
    myReaderDesktop.readAsDataURL(fileDesktop);
    this.bannerForm.get('arquivo').setValue(fileDesktop);
  }

  fileChangeListenerMobile($event) {
    let imageMobile: any = new Image();
    const fileMobile: File = $event.target.files[0];
    let myReaderMobile: FileReader = new FileReader();
    let that = this;
    myReaderMobile.onloadend = function (loadEvent) {
      imageMobile.src = loadEvent.target.result;
      that.cropperMobile.setImage(imageMobile);
    };
    myReaderMobile.readAsDataURL(fileMobile);
    this.bannerForm.get('arquivoMobile').setValue(fileMobile);
  }

  cropped(bounds: Bounds) {
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

}

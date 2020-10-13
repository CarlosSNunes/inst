import { CareplusPerfilCreateModel } from './../../../../models/careplus-perfil/careplus-perfil-create.model';
import { FormControlError } from './../../../../utils/form-control-error';
import { AuthenticationService } from './../../../authentication/authentication.service';
import { UserAuthenticateModel } from './../../../../models/user-authenticate.model';
import { CareplusPerfilService } from './../careplus-perfil.service';
import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, StepChangedArgs, THEME } from 'ng-wizard';

@Component({
  selector: 'app-careplus-perfil-create',
  templateUrl: './careplus-perfil-create.component.html',
  styleUrls: ['./careplus-perfil-create.component.scss']
})
export class CareplusPerfilCreateComponent implements OnInit {
  careplusPerfilForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  //*Configuração 'ng-wizard'
  configBanner: NgWizardConfig = {
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
    },
    selected: 0,
    theme: THEME.dots
  };
  ngWizardService: any;
  constructor(
    private careplusPerfilService: CareplusPerfilService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.careplusPerfilForm = this.fb.group({
      perfilId: [
        '',
        [
          Validators.required,
          FormControlError.noWhitespaceValidator
        ]
      ],
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
    });
  }

  get f() {
    return this.careplusPerfilForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusPerfilForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusPerfilCreateModel(this.careplusPerfilForm.value);
      this.careplusPerfilService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/careplus-perfil']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
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

}

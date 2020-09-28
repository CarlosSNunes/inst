import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CategoriasService } from '../categorias.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CategoriasCreateModel } from 'src/models/categorias/categorias-create.model';
import { NgWizardConfig, THEME } from 'ng-wizard';

@Component({
  selector: 'app-categorias-create',
  templateUrl: './categorias-create.component.html',
  styleUrls: ['./categorias-create.component.scss']
})
export class CategoriasCreateComponent implements OnInit {
  categoriasForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;

//*Configuração 'ng-wizard'
config: NgWizardConfig = {
  selected: 0,
  theme: THEME.dots,
  toolbarSettings:{
    showNextButton:false,
    showPreviousButton: false
  }
};

ngWizardService: any;

  constructor(
    private authenticateService: AuthenticationService,
    private categoriasService: CategoriasService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.categoriasForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],     
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ]
    });
  }
  
  get f() {
    return this.categoriasForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoriasForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CategoriasCreateModel(this.categoriasForm.value);
      this.categoriasService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/posts-blog/categorias/index']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}

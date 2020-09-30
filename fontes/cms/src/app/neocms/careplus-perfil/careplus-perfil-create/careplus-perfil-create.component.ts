import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusPerfilService } from '../careplus-perfil.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusPerfilCreateModel } from 'src/models/careplus-perfil/careplus-perfil-create.model';

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
}

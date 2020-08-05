import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusDepoimentoCreateModel } from 'src/models/careplus-depoimento/careplus-depoimento-create.model';

@Component({
  selector: 'app-careplus-depoimento-create',
  templateUrl: './careplus-depoimento-create.component.html',
  styleUrls: ['./careplus-depoimento-create.component.scss']
})
export class CareplusDepoimentoCreateComponent implements OnInit {
  careplusDepoimentoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;

  constructor(
    private careplusDepoimentoService: CareplusDepoimentoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.careplusDepoimentoForm = this.fb.group({
      autor: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: ['', [Validators.required, Validators.maxLength(1000), FormControlError.noWhitespaceValidator]],
    });
  }

  get f() {
    return this.careplusDepoimentoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusDepoimentoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusDepoimentoCreateModel(this.careplusDepoimentoForm.value);
      this.careplusDepoimentoService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/careplus-depoimento']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

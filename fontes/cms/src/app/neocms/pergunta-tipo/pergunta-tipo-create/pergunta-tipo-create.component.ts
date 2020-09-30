import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { PerguntaTipoCreateModel } from 'src/models/pergunta-tipo/pergunta-tipo-create.model';

@Component({
  selector: 'app-pergunta-tipo-create',
  templateUrl: './pergunta-tipo-create.component.html',
  styleUrls: ['./pergunta-tipo-create.component.scss']
})
export class PerguntaTipoCreateComponent implements OnInit {
  perguntaTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;

  constructor(
    private perguntaTipoService: PerguntaTipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.perguntaTipoForm = this.fb.group({
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
    return this.perguntaTipoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.perguntaTipoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new PerguntaTipoCreateModel(this.perguntaTipoForm.value);
      this.perguntaTipoService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/pergunta-tipo']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoTipoService } from '../documento-tipo.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { DocumentoTipoCreateModel } from 'src/models/documento-tipo/documento-tipo-create.model';
import { FormControlError } from 'src/utils/form-control-error';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-documento-tipo-create',
  templateUrl: './documento-tipo-create.component.html',
  styleUrls: ['./documento-tipo-create.component.scss']
})
export class DocumentoTipoCreateComponent implements OnInit {
  documentoTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;

  constructor(
    private documentoTipoService: DocumentoTipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
  }

  createForm() {
    this.documentoTipoForm = this.fb.group({
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
    return this.documentoTipoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.documentoTipoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new DocumentoTipoCreateModel(this.documentoTipoForm.value);
      this.documentoTipoService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/documento-tipo']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

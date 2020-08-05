import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { DocumentoTipoService } from '../documento-tipo.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { DocumentoTipoUpdateModel } from 'src/models/documento-tipo/documento-tipo-update.model';

@Component({
  selector: 'app-documento-tipo-edit',
  templateUrl: './documento-tipo-edit.component.html',
  styleUrls: ['./documento-tipo-edit.component.scss']
})
export class DocumentoTipoEditComponent implements OnInit {
  documentoTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  documentoTipo: DocumentoTipoModel;

  constructor(
    private documentoTipoService: DocumentoTipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getDocumentoTipo();
  }

  getDocumentoTipo() {
    const id = this.route.snapshot.paramMap.get('id');

    this.documentoTipoService.getById(id)
      .subscribe(documentoTipo => {
        this.documentoTipo = documentoTipo;
        this.updateForm();
      });
  }

  updateForm() {
    this.documentoTipoForm = this.fb.group({
      id: [this.documentoTipo.id, [Validators.required]],
      descricao: [
        this.documentoTipo.descricao,
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
    });
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
      ]
    });
  }

  get f() {
    return this.documentoTipoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.documentoTipoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new DocumentoTipoUpdateModel(this.documentoTipoForm.value);
      this.documentoTipoService.put(model)
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

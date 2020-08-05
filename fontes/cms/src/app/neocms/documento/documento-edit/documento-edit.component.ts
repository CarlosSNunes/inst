import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { DocumentoService } from '../documento.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { DocumentoUpdateModel } from 'src/models/documento/documento-update.model';

@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.scss']
})
export class DocumentoEditComponent implements OnInit {
  documentoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  documento: DocumentoModel;

  constructor(
    private documentoService: DocumentoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getDocumento();
  }

  getDocumento() {
    const id = this.route.snapshot.paramMap.get('id');

    this.documentoService.getById(id)
      .subscribe(documento => {
        this.documento = documento;
        this.arquivoNome = documento.nomeDocumento;
        this.updateForm();
      });
  }

  updateForm() {
    this.documentoForm = this.fb.group({
      id: [this.documento.id, [Validators.required]],
      descricao: [this.documento.descricao, [Validators.required, Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      arquivo: ['']
    });
  }

  createForm() {
    this.documentoForm = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
      arquivo: ['']
    });
  }

  get f() {
    return this.documentoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.documentoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new DocumentoUpdateModel(this.documentoForm.value);
      this.documentoService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/documento']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  updateFileName(arquivos: any) {
    this.arquivoNome = 'Selecione um arquivo';
    this.arquivo = null;

    if (arquivos.length > 0) {
      this.arquivoNome = arquivos[0].name;
      this.arquivo = arquivos[0];
    }

    this.documentoForm.controls.arquivo.setValue(this.arquivo);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

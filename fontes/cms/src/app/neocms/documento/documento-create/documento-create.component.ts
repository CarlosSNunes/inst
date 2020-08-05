import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { DocumentoService } from '../documento.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { DocumentoCreateModel } from 'src/models/documento/documento-create.model';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { DocumentoTipoService } from '../../documento-tipo/documento-tipo.service';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';

@Component({
  selector: 'app-documento-create',
  templateUrl: './documento-create.component.html',
  styleUrls: ['./documento-create.component.scss']
})
export class DocumentoCreateComponent implements OnInit {
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
  careplusPerfis: CareplusPerfilModel[];
  documentoTipos: DocumentoTipoModel[];

  constructor(
    private documentoService: DocumentoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private careplusPerfilService: CareplusPerfilService,
    private documentoTipoService: DocumentoTipoService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.getPerfis();
    this.getDocumentoTipos();
    this.createForm();
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
      arquivo: ['', [Validators.required]],
      careplusPerfilId: ['', [Validators.required]],
      documentoTipoId: ['', [Validators.required]],
    });
  }

  getPerfis() {
    this.careplusPerfilService.getAll()
      .subscribe(perfis => this.careplusPerfis = perfis);
  }

  getDocumentoTipos() {
    this.documentoTipoService.getAll()
      .subscribe(documentoTipos => this.documentoTipos = documentoTipos);
  }

  get f() {
    return this.documentoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.documentoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new DocumentoCreateModel(this.documentoForm.value);
      this.documentoService.post(model)
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

import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { faPlus, faUpload, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CareplusDiferencialService } from '../careplus-diferencial.service';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDiferencialUpdateModel } from 'src/models/careplus-diferencial/careplus-diferencial-update.model';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';

@Component({
  selector: 'app-careplus-diferencial-edit',
  templateUrl: './careplus-diferencial-edit.component.html',
  styleUrls: ['./careplus-diferencial-edit.component.scss']
})
export class CareplusDiferencialEditComponent implements OnInit {
  careplusDiferencialForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  careplusDiferencial: CareplusDiferencialModel;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;

  constructor(
    private careplusDiferencialService: CareplusDiferencialService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getCareplusDiferencial();
  }

  getCareplusDiferencial() {
    const id = this.route.snapshot.paramMap.get('id');

    this.careplusDiferencialService.getById(id)
      .subscribe(careplusDiferencial => {
        this.careplusDiferencial = careplusDiferencial;
        this.arquivoNome = careplusDiferencial.nomeImagem;
        this.updateForm();
      });
  }

  createForm() {
    this.careplusDiferencialForm = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      subtitulo: [
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
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
      arquivo: ['']
    });
  }

  updateForm() {
    this.careplusDiferencialForm = this.fb.group({
      id: [this.careplusDiferencial.id, [Validators.required]],
      titulo: [
        this.careplusDiferencial.titulo,
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      subtitulo: [
        this.careplusDiferencial.subtitulo,
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      descricao: [
        this.careplusDiferencial.descricao,
        [
          Validators.required,
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
      arquivo: ['']
    });
  }

  get f() {
    return this.careplusDiferencialForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusDiferencialForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusDiferencialUpdateModel(this.careplusDiferencialForm.value);
      this.careplusDiferencialService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/careplus-diferencial']);
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

    this.careplusDiferencialForm.controls.arquivo.setValue(this.arquivo);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }

}

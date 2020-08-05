import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaService } from '../pergunta.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { PerguntaCreateModel } from 'src/models/pergunta/pergunta-create.model';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { PerguntaTipoService } from '../../pergunta-tipo/pergunta-tipo.service';

@Component({
  selector: 'app-pergunta-create',
  templateUrl: './pergunta-create.component.html',
  styleUrls: ['./pergunta-create.component.scss']
})
export class PerguntaCreateComponent implements OnInit {
  perguntaForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  perguntaTipos: PerguntaTipoModel[];

  constructor(
    private perguntaService: PerguntaService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private perguntaTipoService: PerguntaTipoService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.getPerguntaTipos();
    this.createForm();
  }

  createForm() {
    this.perguntaForm = this.fb.group({
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
      resposta: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
      perguntaTipoId: ['', [Validators.required]]
    });
  }

  getPerguntaTipos() {
    this.perguntaTipoService.getAll()
      .subscribe(perguntaTipos => this.perguntaTipos = perguntaTipos);
  }

  get f() {
    return this.perguntaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.perguntaForm.valid) {
      this.btnSubmitDisable = true;

      const model = new PerguntaCreateModel(this.perguntaForm.value);
      this.perguntaService.post(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/pergunta']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

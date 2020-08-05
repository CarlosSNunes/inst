import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { PerguntaService } from '../pergunta.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { PerguntaUpdateModel } from 'src/models/pergunta/pergunta-update.model';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { PerguntaTipoService } from '../../pergunta-tipo/pergunta-tipo.service';

@Component({
  selector: 'app-pergunta-edit',
  templateUrl: './pergunta-edit.component.html',
  styleUrls: ['./pergunta-edit.component.scss']
})
export class PerguntaEditComponent implements OnInit {
  perguntaForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  pergunta: PerguntaModel;
  perguntaTipos: PerguntaTipoModel[];

  constructor(
    private perguntaService: PerguntaService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
    private perguntaTipoService: PerguntaTipoService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.getPerguntaTipos();
    this.createForm();
    this.getPergunta();
  }

  getPergunta() {
    const id = this.route.snapshot.paramMap.get('id');

    this.perguntaService.getById(id)
      .subscribe(pergunta => {
        this.pergunta = pergunta;
        this.updateForm();
      });
  }

  getPerguntaTipos() {
    this.perguntaTipoService.getAll()
      .subscribe(perguntaTipos => this.perguntaTipos = perguntaTipos);
  }

  updateForm() {
    this.perguntaForm = this.fb.group({
      id: [this.pergunta.id, [Validators.required]],
      descricao: [
        this.pergunta.descricao,
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
      resposta: [
        this.pergunta.resposta,
        [
          Validators.required,
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
      perguntaTipoId: [this.pergunta.perguntaTipoId, [Validators.required]]
    });
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

  get f() {
    return this.perguntaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.perguntaForm.valid) {
      this.btnSubmitDisable = true;

      const model = new PerguntaUpdateModel(this.perguntaForm.value);
      this.perguntaService.put(model)
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

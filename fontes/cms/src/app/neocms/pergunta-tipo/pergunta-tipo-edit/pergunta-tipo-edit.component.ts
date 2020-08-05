import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { PerguntaTipoUpdateModel } from 'src/models/pergunta-tipo/pergunta-tipo-update.model';

@Component({
  selector: 'app-pergunta-tipo-edit',
  templateUrl: './pergunta-tipo-edit.component.html',
  styleUrls: ['./pergunta-tipo-edit.component.scss']
})
export class PerguntaTipoEditComponent implements OnInit {
  perguntaTipoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  perguntaTipo: PerguntaTipoModel;

  constructor(
    private perguntaTipoService: PerguntaTipoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getPerguntaTipo();
  }

  getPerguntaTipo() {
    const id = this.route.snapshot.paramMap.get('id');

    this.perguntaTipoService.getById(id)
      .subscribe(perguntaTipo => {
        this.perguntaTipo = perguntaTipo;
        this.updateForm();
      });
  }

  updateForm() {
    this.perguntaTipoForm = this.fb.group({
      id: [this.perguntaTipo.id, [Validators.required]],
      descricao: [
        this.perguntaTipo.descricao,
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
    });
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
      ]
    });
  }

  get f() {
    return this.perguntaTipoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.perguntaTipoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new PerguntaTipoUpdateModel(this.perguntaTipoForm.value);
      this.perguntaTipoService.put(model)
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

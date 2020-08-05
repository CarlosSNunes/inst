import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusDepoimentoUpdateModel } from 'src/models/careplus-depoimento/careplus-depoimento-update.model';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';

@Component({
  selector: 'app-careplus-depoimento-edit',
  templateUrl: './careplus-depoimento-edit.component.html',
  styleUrls: ['./careplus-depoimento-edit.component.scss']
})
export class CareplusDepoimentoEditComponent implements OnInit {
  careplusDepoimentoForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  careplusDepoimento: CareplusDepoimentoUpdateModel;

  constructor(
    private careplusDepoimentoService: CareplusDepoimentoService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getCareplusDepoimento();
  }

  getCareplusDepoimento() {
    const id = this.route.snapshot.paramMap.get('id');

    this.careplusDepoimentoService.getById(id)
      .subscribe(careplusDepoimento => {
        this.careplusDepoimento = careplusDepoimento;
        this.updateForm();
      });
  }

  createForm() {
    this.careplusDepoimentoForm = this.fb.group({
      autor: ['', [Validators.required, Validators.maxLength(100), FormControlError.noWhitespaceValidator]],
      descricao: ['', [Validators.required, Validators.maxLength(1000), FormControlError.noWhitespaceValidator]],
    });
  }

  updateForm() {
    this.careplusDepoimentoForm = this.fb.group({
      id: [this.careplusDepoimento.id, [Validators.required]],
      autor: [
        this.careplusDepoimento.autor,
        [
          Validators.required,
          Validators.maxLength(100),
          FormControlError.noWhitespaceValidator
        ]
      ],
      descricao: [
        this.careplusDepoimento.descricao,
        [
          Validators.required,
          Validators.maxLength(1000),
          FormControlError.noWhitespaceValidator
        ]
      ],
    });
  }

  get f() {
    return this.careplusDepoimentoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusDepoimentoForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusDepoimentoUpdateModel(this.careplusDepoimentoForm.value);
      this.careplusDepoimentoService.put(model)
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

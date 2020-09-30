import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';
import { CareplusPerfilService } from '../careplus-perfil.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormControlError } from 'src/utils/form-control-error';
import { CareplusPerfilUpdateModel } from 'src/models/careplus-perfil/careplus-perfil-update.model';

@Component({
  selector: 'app-careplus-perfil-edit',
  templateUrl: './careplus-perfil-edit.component.html',
  styleUrls: ['./careplus-perfil-edit.component.scss']
})
export class CareplusPerfilEditComponent implements OnInit {
  careplusPerfilForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faUpload = faUpload;
  faPlus = faPlus;
  submitted: boolean;
  usuario: UserAuthenticateModel;
  btnSubmitDisable = false;
  careplusPerfil: CareplusPerfilModel;

  constructor(
    private careplusPerfilService: CareplusPerfilService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuario = this.authenticateService.state;
    this.createForm();
    this.getCareplusPerfil();
  }

  getCareplusPerfil() {
    const id = this.route.snapshot.paramMap.get('id');

    this.careplusPerfilService.getById(id)
      .subscribe(careplusPerfil => {
        this.careplusPerfil = careplusPerfil;
        this.updateForm();
      });
  }

  updateForm() {
    this.careplusPerfilForm = this.fb.group({
      id: [this.careplusPerfil.id, [Validators.required]],
      descricao: [
        this.careplusPerfil.descricao,
        [
          Validators.required,
          Validators.maxLength(255),
          FormControlError.noWhitespaceValidator
        ]
      ],
    });
  }

  createForm() {
    this.careplusPerfilForm = this.fb.group({
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
    return this.careplusPerfilForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.careplusPerfilForm.valid) {
      this.btnSubmitDisable = true;

      const model = new CareplusPerfilUpdateModel(this.careplusPerfilForm.value);
      this.careplusPerfilService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/careplus-perfil']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

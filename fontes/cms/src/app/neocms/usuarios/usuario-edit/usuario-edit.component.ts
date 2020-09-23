import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus, faTimes,faArrowAltCircleLeft, faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { FormControlError } from 'src/utils/form-control-error';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {
  usuarioForm;
  faTimes = faTimes;
  faCheck = faCheck;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  arquivoNome = 'Selecione um arquivo';
  arquivo: File;
  submitted: boolean;
  usuarioAuth: UserAuthenticateModel;
  btnSubmitDisable = false;
  usuarioModel: UsuarioModel;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuarioAuth = this.authenticateService.state;
    this.createForm();
    this.getCliente();
  }

  getCliente() {
    const id = this.route.snapshot.paramMap.get('id');

    this.usuarioService.getById(id)
      .subscribe(usuario => {
        this.usuarioModel = usuario;
        this.updateForm();
      });
  }

  updateForm() {
    this.usuarioForm = this.fb.group({
      id: [this.usuarioModel.id, [Validators.required]],
      nome: [this.usuarioModel.nome, [Validators.required, Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      email: [this.usuarioModel.email, [Validators.required, Validators.email, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],
      usuarioperfil: [this.usuarioModel.usuarioPerfil, [Validators.required, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],

    });
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.maxLength(255), Validators.required, FormControlError.noWhitespaceValidator]],
      email: ['', [Validators.required,Validators.email, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],
      usuarioPerfil: ['', [Validators.required, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],

    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.usuarioForm.valid) {
      this.btnSubmitDisable = true;

      const model = new UsuarioModel(this.usuarioForm.value);
      this.usuarioService.put(model)
        .subscribe(() => {
          this.router.navigate(['/neocms/usuarios']);
        })
        .add(() => this.btnSubmitDisable = false);
    }
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

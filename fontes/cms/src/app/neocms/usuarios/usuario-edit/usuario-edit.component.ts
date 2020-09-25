import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes, faArrowCircleLeft,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
  faArrowCircleLeft = faArrowCircleLeft;
  faInfoCircle = faInfoCircle;
  submitted: boolean;
  usuarioAuth: UserAuthenticateModel;
  btnSubmitDisable = false;
  usuarioModel: UsuarioModel;

  checkAdministrador;
  checkVisualizador;
  checkColaborador;
  checkEditor;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.usuarioAuth = this.authenticateService.state;

    this.checkAdministrador = document.getElementById('checkAdministrador');

    this.getUsuario();
  }

  getUsuario() {
    const id = this.route.snapshot.paramMap.get('id');

    this.usuarioService.getById(id)
      .subscribe(usuario => {
        this.usuarioModel = usuario;
        this.usuarioModel.usuarioPerfil.forEach(perfil => {
          
          if(perfil.descricao == 'Administrador'){
            document.getElementById('checkAdministrador').setAttribute('checked', '');
          }
          if(perfil.descricao == 'Editor'){
            document.getElementById('checkEditor').setAttribute('checked', '');
          }
          if(perfil.descricao == 'Visualizador'){
            document.getElementById('checkVisualizador').setAttribute('checked', '');
          }
          if(perfil.descricao == 'Colaborador'){
            document.getElementById('checkColaborador').setAttribute('checked', '');
          }
        });
      });
  }

  eventCheck(event){

    if(event.value == 'Administrador')
    {
      if(event.checked == true)
      {
        this.usuarioModel.usuarioPerfil.push({id:'1', descricao:'Administrador'})
      }
      else{
        this.usuarioModel.usuarioPerfil.pop();
      }
    }
      console.log(event.checked);
  }

  updateForm() {
    this.usuarioForm = this.fb.group({
      id: [this.usuarioModel.id, [Validators.required]],
      nome: [this.usuarioModel.nome, [Validators.required, Validators.maxLength(255), FormControlError.noWhitespaceValidator]],
      email: [this.usuarioModel.email, [Validators.required, Validators.email, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],
      usuarioPerfil: [this.usuarioModel.usuarioPerfil, [Validators.required, Validators.maxLength(15), FormControlError.noWhitespaceValidator]],

    });
  }

  get f() {
    return this.usuarioForm.controls;
  }

  salvarAlteracoes() {
    this.submitted = true;
      this.usuarioService.put(this.usuarioModel)
        .subscribe(() => {
          this.router.navigate(['/neocms/usuarios']);
        })
        .add(() => this.btnSubmitDisable = false);
  }

  getErrors(control: AbstractControl) {
    return FormControlError.GetErrors(control);
  }
}

import { CareplusPerfilModel } from './../../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgWizardConfig, THEME, StepChangedArgs } from 'ng-wizard';
import { UserAuthenticateModel } from '../../../../models/user-authenticate.model';
import { CareplusPerfilService } from '../../careplus-perfil/careplus-perfil.service';
import { UsuarioService } from '../usuario.service';
import { AuthenticationService } from './../../../../../src/app/authentication/authentication.service';
import { FormControlError } from './../../../../../src/utils/form-control-error';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { UsuarioUpdateModel } from 'src/models/usuario/usuario-update.model';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})
export class UsuarioUpdateComponent implements OnInit {

  userForm: FormGroup;

  perfilList = [];
  loaded: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService

  ) {
  }


  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      nome: [''],
      nomeUsuario: [''],
      ativo: [''],
      usuarioPerfil: [[]],
    });
    this.getUsuario();
    this.getPermissions();
  
  }

  get f() {
    return this.userForm.controls;
  }

  getUsuario() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioService
      .getById(id)
      .subscribe(user => {
        this.loaded = false;
        this.userForm.get('id').setValue(user.id);
        this.userForm.get('nome').setValue(user.nome);
        this.userForm.get('nomeUsuario').setValue(user.nomeUsuario);
        this.userForm.get('ativo').setValue(user.ativo);
        console.log(user.usuarioPerfil)
        this.userForm.get('usuarioPerfil').setValue([{
          perfilId: user.usuarioPerfil[0].id,
          descricao: user.usuarioPerfil[0].descricao
        }]);
        this.loaded = true;
      })
  }


  onSubmit() {
    console.log(this.userForm)
    if (this.userForm.valid) {



      this.usuarioService.put(this.userForm.value)
        .subscribe(() => {
          this.loaded = !this.loaded;
          this.toastrService.success('Usuário atualizado com sucesso!');
          this.router.navigate(['/neocms/usuarios']);
        },
          error => {
            let message = '';
            if (error.error) {
              message = error.error.message || 'Erro Interno no servidor';
            } else {
              message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
          })
        .add(() => this.loaded = !this.loaded);
    }
  }

  getPermissions() {
    this.usuarioService.getPermissions().subscribe((response) => {
      this.perfilList = response;
    },
      error => {
        let message = '';
        if (error.error) {
          message = error.error.message || 'Erro Interno no servidor';
        } else {
          message = error.message || 'Erro Interno';
        }
        this.toastrService.error(message);
      })
  }

  active() {
    if (this.userForm.get('ativo').value == '1') {
      this.userForm.patchValue({
        ativo: '0'
      })
      this.usuarioService.deactivate(this.userForm.get('nomeUsuario').value).subscribe(() => {
        this.toastrService.success("Usuário desativado com sucesso!")
      },
        error => {
          let message = '';
          if (error.error) {
            message = error.error.message || 'Erro Interno no servidor';
          } else {
            message = error.message || 'Erro Interno';
          }
          this.toastrService.error(message);
          this.userForm.patchValue({
            ativo: '1'
          })
        })

    } else {
      this.userForm.patchValue({
        ativo: '1'
      })
      this.usuarioService.put(this.userForm.value)
        .subscribe(() => {
          this.loaded = !this.loaded;
          this.toastrService.success('Usuário atualizado com sucesso!');
        },
          error => {
            let message = '';
            if (error.error) {
              message = error.error.message || 'Erro Interno no servidor';
            } else {
              message = error.message || 'Erro Interno';
            }
            this.toastrService.error(message);
            this.userForm.patchValue({
              ativo: '0'
            })
          })
        .add(() => this.loaded = !this.loaded);
    }
  }
}


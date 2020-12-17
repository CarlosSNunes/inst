import { CareplusPerfilModel } from './../../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { UsuarioUpdateModel } from 'src/models/usuario/usuario-update.model';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-usuario-update',
    templateUrl: './usuario-update.component.html',
    styleUrls: ['./usuario-update.component.scss']
})
export class UsuarioUpdateComponent implements OnInit {
    userForm: FormGroup;
    perfilList = [];
    loaded: boolean = true;
    usuarioModel: UsuarioModel;
    selectedProfile: CareplusPerfilModel;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private usuarioService: UsuarioService,
        private toastrService: ToastrService

    ) {
        this.userForm = this.fb.group({
            id: ['', Validators.compose([Validators.required])],
            nome: ['', Validators.compose([Validators.required])],
            nomeUsuario: ['', Validators.compose([Validators.required])],
            ativo: ['', Validators.compose([Validators.required])],
            perfil: [[],],
        });
    }


    ngOnInit() {
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
                this.usuarioModel = user;
                this.userForm.get('id').setValue(user.id);
                this.userForm.get('nome').setValue(user.nome);
                this.userForm.get('nomeUsuario').setValue(user.nomeUsuario);
                this.userForm.get('ativo').setValue(user.ativo);
                this.userForm.get('perfil').setValue(user.usuarioPerfil[0].id);
                this.loaded = true;
            })
    }

    onSubmit() {
        if (this.userForm.valid) {
            const perfil = this.perfilList.find(p => p.id == this.userForm.get('perfil').value);
            const user = new UsuarioUpdateModel({
                ...this.userForm.value,
                usuarioPerfil: [
                    {
                        perfilId: perfil.id,
                        descricao: perfil.descricao
                    }
                ]
            })

            this.usuarioService.put(user)
                .subscribe(() => {
                    this.loaded = !this.loaded;
                    this.toastrService.success('Usuário atualizado com sucesso!');
                    this.router.navigate(['/neocms/usuarios']);
                },
                    error => {
                        this.loaded = true;
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
            this.userForm.controls.ativo.setValue('1');
            const perfil = this.perfilList.find(p => p.id == this.userForm.get('perfil').value);

            const user = new UsuarioUpdateModel({
                ...this.userForm.value,
                usuarioPerfil: [
                    {
                        perfilId: perfil.id,
                        descricao: perfil.descricao
                    }
                ]
            })
            this.usuarioService.put(user)
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


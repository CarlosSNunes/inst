import { CareplusPerfilModel } from './../../../models/careplus-perfil/careplus-perfil.model';
import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuarioModel } from './../../../models/usuario/usuario.model';
import { UsuarioService } from './usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {
    faPencilAlt = faPencilAlt;
    faTrash = faTrash;
    faPlus = faPlus;
    showUsuarioDelete: boolean;
    usuarios: UsuarioModel[] = [];
    usuario: UsuarioModel;
    perfis: CareplusPerfilModel[];
    usuarioPerfil: any;
    loaded: boolean;
    userPermission: string;

    constructor(
        private usuarioService: UsuarioService,
        private activatedRoute: ActivatedRoute,
        private toastrService: ToastrService,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe(param => {
            if (param.tokenAtivacao) {
                this.validaRequisicao(param.tokenAtivacao);
            }
        })
    }

    ngOnInit() {
        this.userPermission = JSON.parse(localStorage.getItem('user_token')).perfis[0].descricao;
        if(this.userPermission == 'Visualizador'){
            this.router.navigate(['dashboard'])
        }

        this.getUsuarios();
    }

    public openUsuarioDelete(usuario: UsuarioModel) {
        this.usuario = usuario;
    }

    private async validaRequisicao(token: string) {
        try {
            await this.usuarioService.validaRequisicao(token);
            this.toastrService.success('Usuário validado com sucesso!');
            this.router.navigate(['/neocms/usuarios']);
            this.getUsuarios();
        } catch (error) {
            this.router.navigate(['/neocms/usuarios']);
            this.toastrService.error(error.error.message);
        }
    }

    /**
     * @description Metodo que lista todos os usuários
     * @memberOf UsuarioComponent
     */
    public getUsuarios() {
        this.usuarioService
            .getAll()
            .subscribe(usuarios => {
                this.usuarios = usuarios;
            })
            .add(() => this.loaded = true);
    }
}

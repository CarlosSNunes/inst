import { Component, OnInit } from '@angular/core';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-aprovacao',
  templateUrl: './usuario-aprovacao.component.html',
  styleUrls: ['./usuario-aprovacao.component.scss']
})
export class UsuarioAprovacaoComponent implements OnInit {
  users: any = [];
  offset: number = 0;
  limit: number = 5;
  loaded: boolean;
  faTrash = faTrash;
  faCheck = faCheck;

  constructor(private userService: UsuarioService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.getUsers()
  }
  getUsers() {
    this.userService.getPending(this.offset, this.limit).subscribe((response: any) => {
      this.users = response.result;
      this.loaded = !this.loaded
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
  onPageChange(page: number) {
    this.offset = page;
    this.getUsers();
  }
  approve(user) {
    this.userService.approve(user.token).subscribe(() => {
      this.loaded = !this.loaded
      this.toastrService.success("Usuario aprovado com sucesso!");
      this.getUsers();
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
  reprove(user) {
    this.userService.reprove(user.token).subscribe(() => {
      this.loaded = !this.loaded
      this.toastrService.success("Usuario reprovado com sucesso!");
      this.getUsers();
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
}

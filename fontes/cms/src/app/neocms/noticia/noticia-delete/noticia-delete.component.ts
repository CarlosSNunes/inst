import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { NoticiaService } from '../noticia.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-noticia-delete',
  templateUrl: './noticia-delete.component.html',
  styleUrls: ['./noticia-delete.component.scss']
})
export class NoticiaDeleteComponent implements OnInit {
  @Output()
  onClose = new EventEmitter();

  @Input()
  noticia: NoticiaModel;

  usuario: UserAuthenticateModel;

  constructor(
    private noticiaService: NoticiaService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }

  closeModal() {
    this.onClose.emit(null);
  }

  deleteNoticia() {
    this.noticiaService
      .delete(this.noticia.id)
      .subscribe(result => this.closeModal());
  }
}

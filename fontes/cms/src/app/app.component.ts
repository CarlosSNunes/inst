import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from './../../src/models/user-authenticate.model';
import { AuthenticationService } from './../../src/app/authentication/authentication.service';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  usuario: UserAuthenticateModel;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    setTheme('bs4');
    this.authenticationService.usuarioChanged.subscribe(usuario =>
      this.usuario = usuario
    );
  }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }
}

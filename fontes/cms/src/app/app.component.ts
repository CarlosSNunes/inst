import { Component, OnInit } from '@angular/core';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

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
    this.authenticationService.usuarioChanged.subscribe(usuario =>
      this.usuario = usuario
    );
  }

  ngOnInit() {
    this.usuario = this.authenticationService.state;
  }
}

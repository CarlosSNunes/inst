import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
// import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
// import { EventEmitterService } from 'src/services/event-emitter/event-emitter-service.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  // usuario: UserAuthenticateModel;

    constructor(
        // private authenticationService: AuthenticationService
    ) {
        setTheme('bs4');
        // EventEmitterService.get('login').subscribe(usuario =>
        //     this.usuario = usuario
        // );
        // EventEmitterService.get('logout').subscribe(_ =>
        //     this.usuario = undefined
        // );
    }

    ngOnInit() {
        // this.usuario = this.authenticationService.state;
    }

}

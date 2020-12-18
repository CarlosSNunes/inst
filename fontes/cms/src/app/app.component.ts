import { Component, OnInit } from '@angular/core';
// import { UserAuthenticateModel } from './../../src/models/user-authenticate.model';
// import { AuthenticationService } from './../../src/app/authentication/authentication.service';
// import { setTheme } from 'ngx-bootstrap/utils';
// import { EventEmitterService } from 'src/services/event-emitter/event-emitter-service.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    // usuario: UserAuthenticateModel;

    constructor(
        // private authenticationService: AuthenticationService
    ) {
        // setTheme('bs4');
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

import { Component, OnInit } from '@angular/core';
import { faEnvelope, faHome, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/services/event-emitter/event-emitter-service.service';

@Component({
    selector: 'app-neocms-header',
    templateUrl: './neocms-header.component.html',
    styleUrls: ['./neocms-header.component.scss']
})
export class NeocmsHeaderComponent implements OnInit {
    // faEnvelope = faEnvelope;
    // faHome = faHome;
    // faUser = faUser;
    faPowerOff = faPowerOff;
    // usuario: UserAuthenticateModel;

    constructor(
        // private authenticationService: AuthenticationService,
        public router: Router
    ) {
        // EventEmitterService.get('login').subscribe(usuario => {
        //     this.usuario = usuario;
        // });
    }

    ngOnInit() {
        // console.log('aqui',this.authenticationService.state)
        // this.usuario = this.authenticationService.state;
    }

    logOff() {
        // this.authenticationService.state = null;
        // EventEmitterService.get('logout').emit();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}

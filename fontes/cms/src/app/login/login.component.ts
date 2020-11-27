import { Component, OnInit } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from '../../../src/models/login.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../src/app/authentication/authentication.service';
import { EventEmitterService } from 'src/services/event-emitter/event-emitter-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error;
  faEnvelope = faEnvelope;
  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });
  submitted: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.error = null;

    if (this.loginForm.valid) {

      const loginModel = new LoginModel(this.loginForm.value);
      try {
        // this.authenticationService.state = await this.loginService.login(loginModel)
        let response = await this.loginService.login(loginModel);
        localStorage.setItem('user_token', JSON.stringify(response))
        this.goTo('neocms')
      } catch (err) {
        this.error = err.error;
      }
      // this.loginService.login(loginModel)
      // .subscribe(response => {
      //   this.authenticationService.state = response;
      //   EventEmitterService.get('login').emit(response);
      //   this.router.navigate(['/neocms']);
      // },
      //   error => {
      //     this.error = error;
      //   });
    }


  }
  goTo(route) {
    this.router.navigate([route]);
  }
}

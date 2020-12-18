import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { NeocmsComponent } from '../neocms/neocms.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NeocmsComponent
      ],
      imports: [
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{ path: '', component: LoginComponent }, { path: 'neocms', component: NeocmsComponent }]
        )
      ]
    })
      .compileComponents();
    authenticationService = TestBed.get(AuthenticationService);
    loginService = TestBed.get(LoginService);
    router = TestBed.get(Router);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const comp = new LoginComponent(loginService, router, authenticationService);
    comp.ngOnInit();
    expect(comp).not.toBeNull();
  });

  it('f', () => {
    const comp = new LoginComponent(loginService, router, authenticationService);
    expect(comp.f).not.toBeNull();
  });

  it('onSubmit fail', () => {
    const comp = new LoginComponent(loginService, router, authenticationService);
    comp.onSubmit();
    expect(comp.loginForm.valid).toBe(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    const comp = new LoginComponent(loginService, router, authenticationService);
    const usuario: UserAuthenticateModel = new UserAuthenticateModel({ perfis: [] });
    spyOn(loginService, 'login').and.returnValue(of(usuario));
    comp.f.email.setValue('email@email.com');
    comp.f.senha.setValue('123456');
    comp.onSubmit();
    fixture.detectChanges();
    expect(authenticationService.state).toBe(usuario);
    done();
  });

  it('onSubmit exception', (done: DoneFn) => {
    const comp = new LoginComponent(loginService, router, authenticationService);
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(loginService, 'login').and.returnValue(error);
    comp.f.email.setValue('email@email.com');
    comp.f.senha.setValue('123456');
    comp.onSubmit();
    fixture.detectChanges();
    expect(comp.error).toBe(errorMessage);
    done();
  });
});

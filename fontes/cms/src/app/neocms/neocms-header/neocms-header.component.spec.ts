import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeocmsHeaderComponent } from './neocms-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LoginComponent } from 'src/app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: NeocmsHeaderComponent;
  let fixture: ComponentFixture<NeocmsHeaderComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NeocmsHeaderComponent,
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: '', component: NeocmsHeaderComponent}, {path: 'login', component: LoginComponent}]
        ),
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthenticationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeocmsHeaderComponent);
    component = fixture.componentInstance;
    authenticationService = new AuthenticationService();
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.usuario).toEqual(authenticationService.state);
  });

  it('logOff', () => {
    component.logOff();
    authenticationService = TestBed.get(AuthenticationService);
    expect(authenticationService.state).toEqual(null);
  });
});

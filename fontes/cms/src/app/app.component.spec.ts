import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { NeocmsHeaderModule } from './neocms/neocms-header/neocms-header.module';
import { NeocmsFooterModule } from './neocms/neocms-footer/neocms-footer.module';
import { NeocmsMenuLateralModule } from './neocms/neocms-menu-lateral/neocms-menu-lateral.module';
import { AuthenticationService } from './authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';


describe('AppComponent', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthenticationModule,
        NeocmsHeaderModule,
        NeocmsFooterModule,
        NeocmsMenuLateralModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthenticationService
      ]
    }).compileComponents();
    authenticationService = TestBed.get(AuthenticationService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('ngOnInit', (done: DoneFn) => {
    const comp = new AppComponent(authenticationService);
    comp.ngOnInit();
    const usuario: UserAuthenticateModel = new UserAuthenticateModel({ perfis: [] });
    authenticationService.usuarioChanged.subscribe(value => {
      expect(value).not.toBeNull();
      expect(comp.usuario).not.toBeNull();
      done();
    });
    authenticationService.state = usuario;
  });
});

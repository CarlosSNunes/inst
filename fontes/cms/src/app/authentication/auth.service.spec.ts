import { TestBed } from '@angular/core/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthService', () => {
  let router;
  let authenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        AuthenticationService,
      ]
    });
    router = TestBed.get(Router);
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });

  it('canActivate', () => {
    authenticationService.state = null;
    const service = new AuthGuard(authenticationService, router);
    const result = service.canActivate(new ActivatedRouteSnapshot(), { url: 'testUrl' } as RouterStateSnapshot);
    expect(result).toBe(false);
  });

  it('canActivate', () => {
    authenticationService.state = new UserAuthenticateModel({ perfis: [] });
    const service = new AuthGuard(authenticationService, router);
    const result = service.canActivate(new ActivatedRouteSnapshot(), { url: 'testUrl' } as RouterStateSnapshot);
    expect(result).toBe(true);
  });
});

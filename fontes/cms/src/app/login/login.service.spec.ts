import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { HttpErrorResponse, } from '@angular/common/http';
import { LoginModel } from 'src/models/login.model';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let service: LoginService;
  const usuario: LoginModel = new LoginModel({ nomeUsuario: 'test.careplus', senha: '123456' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', (done: DoneFn) => {
    const result = service.login(usuario);
    expect(result).not.toBeNull();
    done();
  });
});

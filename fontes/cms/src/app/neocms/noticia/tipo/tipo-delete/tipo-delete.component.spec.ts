import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeleteComponent } from './tipo-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TipoService } from '../tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { of } from 'rxjs';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

describe('TipoDeleteComponent', () => {
  let component: TipoDeleteComponent;
  let fixture: ComponentFixture<TipoDeleteComponent>;
  let tipoService: TipoService;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeleteComponent);
    component = fixture.componentInstance;
    tipoService = TestBed.get(TipoService);
    authenticationService = TestBed.get(AuthenticationService);
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    component.noticiaTipo = new NoticiaTipoModel({ id: 1, descricao: 'teste' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', () => {
    component.closeModal(null);
    expect(component.onClose).not.toBeNull();
  });

  it('deleteTipo', (done: DoneFn) => {
    spyOn(tipoService, 'delete').and.returnValue(of(true));
    component.usuario = new UserAuthenticateModel({ perfis: [], token: '123' });
    component.deleteTipo();
    fixture.detectChanges();
    expect(component.onClose).not.toBeNull();
    done();
  });
});

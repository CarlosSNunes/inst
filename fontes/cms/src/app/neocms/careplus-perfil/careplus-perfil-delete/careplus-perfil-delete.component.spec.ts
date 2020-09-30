import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';
import { CareplusPerfilDeleteComponent } from './careplus-perfil-delete.component';
import { CareplusPerfilService } from '../careplus-perfil.service';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';

describe('CareplusPerfilDeleteComponent', () => {
  let component: CareplusPerfilDeleteComponent;
  let fixture: ComponentFixture<CareplusPerfilDeleteComponent>;
  let careplusPerfilService: CareplusPerfilService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareplusPerfilDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusPerfilDeleteComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(CareplusPerfilService);
    component.careplusPerfil = new CareplusPerfilModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', () => {
    component.closeModal();
    return;
  });

  it('deleteCareplusPerfil success', (done: DoneFn) => {
    spyOn(careplusPerfilService, 'delete').and.returnValue(of(null));
    component.deleteCareplusPerfil();
    fixture.detectChanges();
    done();
    return;
  });
});

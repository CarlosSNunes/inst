import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusPerfilCreateComponent } from './careplus-perfil-create.component';
import { CareplusPerfilComponent } from '../careplus-perfil.component';
import { CareplusPerfilDeleteComponent } from '../careplus-perfil-delete/careplus-perfil-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusPerfilService } from '../careplus-perfil.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('CareplusPerfilCreateComponent', () => {
  let component: CareplusPerfilCreateComponent;
  let fixture: ComponentFixture<CareplusPerfilCreateComponent>;
  let careplusPerfilService: CareplusPerfilService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusPerfilCreateComponent,
        CareplusPerfilComponent,
        CareplusPerfilDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/careplus-perfil', component: CareplusPerfilComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusPerfilCreateComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(CareplusPerfilService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.careplusPerfilForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.careplusPerfilForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(careplusPerfilService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.careplusPerfilForm.valid).toEqual(true);
    done();
  });
});

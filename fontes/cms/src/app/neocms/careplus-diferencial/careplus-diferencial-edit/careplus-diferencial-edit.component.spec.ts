import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDiferencialEditComponent } from './careplus-diferencial-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDiferencialService } from '../careplus-diferencial.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';
import { CareplusDiferencialComponent } from '../careplus-diferencial.component';
import { CareplusDiferencialDeleteComponent } from '../careplus-diferencial-delete/careplus-diferencial-delete.component';

describe('DiferencialEditComponent', () => {
  let component: CareplusDiferencialEditComponent;
  let fixture: ComponentFixture<CareplusDiferencialEditComponent>;
  let careplusDiferencialService: CareplusDiferencialService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusDiferencialEditComponent,
        CareplusDiferencialComponent,
        CareplusDiferencialDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/careplus-diferencial', component: CareplusDiferencialComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusDiferencialEditComponent);
    component = fixture.componentInstance;
    component.careplusDiferencial = new CareplusDiferencialModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    careplusDiferencialService = TestBed.get(CareplusDiferencialService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.f.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.careplusDiferencialForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(careplusDiferencialService, 'put').and.returnValue(of(null));
    component.f.titulo.setValue('teste');
    component.f.subtitulo.setValue('teste');
    component.f.descricao.setValue('teste');
    component.f.arquivo.setValue('teste');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.careplusDiferencialForm.valid).toEqual(true);
    done();
  });
});

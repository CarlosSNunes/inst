import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDepoimentoEditComponent } from './careplus-depoimento-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CareplusDepoimentoComponent } from '../careplus-depoimento.component';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';
import { CareplusDepoimentoDeleteComponent } from '../careplus-depoimento-delete/careplus-depoimento-delete.component';

describe('CareplusDepoimentoEditComponent', () => {
  let component: CareplusDepoimentoEditComponent;
  let fixture: ComponentFixture<CareplusDepoimentoEditComponent>;
  let careplusDepoimentoService: CareplusDepoimentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusDepoimentoEditComponent,
        CareplusDepoimentoComponent,
        CareplusDepoimentoDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/careplus-depoimento', component: CareplusDepoimentoComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusDepoimentoEditComponent);
    component = fixture.componentInstance;
    component.careplusDepoimento = new CareplusDepoimentoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    careplusDepoimentoService = TestBed.get(CareplusDepoimentoService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.careplusDepoimentoForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.careplusDepoimentoForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(careplusDepoimentoService, 'put').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.autor.setValue('rota');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.careplusDepoimentoForm.valid).toEqual(true);
    done();
  });
});

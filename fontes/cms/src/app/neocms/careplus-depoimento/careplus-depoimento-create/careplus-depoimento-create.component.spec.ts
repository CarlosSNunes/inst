import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDepoimentoCreateComponent } from './careplus-depoimento-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDepoimentoService } from '../careplus-depoimento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';
import { CareplusDepoimentoComponent } from '../careplus-depoimento.component';
import { CareplusDepoimentoDeleteComponent } from '../careplus-depoimento-delete/careplus-depoimento-delete.component';

describe('CareplusDepoimentoCreateComponent', () => {
  let component: CareplusDepoimentoCreateComponent;
  let fixture: ComponentFixture<CareplusDepoimentoCreateComponent>;
  let careplusDepoimentoService: CareplusDepoimentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusDepoimentoCreateComponent,
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
    fixture = TestBed.createComponent(CareplusDepoimentoCreateComponent);
    component = fixture.componentInstance;
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
    spyOn(careplusDepoimentoService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.autor.setValue('rota');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.careplusDepoimentoForm.valid).toEqual(true);
    done();
  });
});

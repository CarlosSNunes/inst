import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDepoimentoComponent } from './careplus-depoimento.component';
import { CareplusDepoimentoDeleteComponent } from './careplus-depoimento-delete/careplus-depoimento-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDepoimentoService } from './careplus-depoimento.service';
import { CareplusDepoimentoModel } from 'src/models/careplus-depoimento/careplus-depoimento.model';
import { of, throwError } from 'rxjs';

describe('CareplusDepoimentoComponent', () => {
  let component: CareplusDepoimentoComponent;
  let fixture: ComponentFixture<CareplusDepoimentoComponent>;
  let careplusDepoimentoService: CareplusDepoimentoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusDepoimentoComponent,
        CareplusDepoimentoDeleteComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareplusDepoimentoComponent);
    component = fixture.componentInstance;
    careplusDepoimentoService = TestBed.get(CareplusDepoimentoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openCareplusDepoimentoDelete', () => {
    component.openCareplusDepoimentoDelete(new CareplusDepoimentoModel({}));
    expect(component.showCareplusDepoimentoDelete).toEqual(true);
  });

  it('getCareplusDepoimentos success', (done: DoneFn) => {
    const careplusDepoimentos = new CareplusDepoimentoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusDepoimentoService, 'getAll').and.returnValue(of([careplusDepoimentos]));
    component.getCareplusDepoimentos();
    fixture.detectChanges();
    expect(component.showCareplusDepoimentoDelete).toEqual(false);
    done();
  });

  it('getCareplusDepoimentos error', (done: DoneFn) => {
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(careplusDepoimentoService, 'getAll').and.returnValue(error);
    component.getCareplusDepoimentos();
    fixture.detectChanges();
    expect(component.showCareplusDepoimentoDelete).toEqual(false);
    done();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusDiferencialComponent } from './careplus-diferencial.component';
import { CareplusDiferencialDeleteComponent } from './careplus-diferencial-delete/careplus-diferencial-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusDiferencialService } from './careplus-diferencial.service';
import { CareplusDiferencialModel } from 'src/models/careplus-diferencial/careplus-diferencial.model';
import { of, throwError } from 'rxjs';

describe('CareplusDiferencialComponent', () => {
  let component: CareplusDiferencialComponent;
  let fixture: ComponentFixture<CareplusDiferencialComponent>;
  let careplusDiferencialService: CareplusDiferencialService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusDiferencialComponent,
        CareplusDiferencialDeleteComponent
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
    fixture = TestBed.createComponent(CareplusDiferencialComponent);
    component = fixture.componentInstance;
    careplusDiferencialService = TestBed.get(CareplusDiferencialService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openCareplusDiferencialDelete', () => {
    component.openCareplusDiferencialDelete(new CareplusDiferencialModel({}));
    expect(component.showCareplusDiferencialDelete).toEqual(true);
  });

  it('getCareplusDiferenciais success', (done: DoneFn) => {
    const careplusDiferencials = new CareplusDiferencialModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusDiferencialService, 'getAll').and.returnValue(of([careplusDiferencials]));
    component.getCareplusDiferenciais();
    fixture.detectChanges();
    expect(component.showCareplusDiferencialDelete).toEqual(false);
    done();
  });
});

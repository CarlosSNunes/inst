import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareplusPerfilComponent } from './careplus-perfil.component';
import { CareplusPerfilService } from './careplus-perfil.service';
import { CareplusPerfilDeleteComponent } from './careplus-perfil-delete/careplus-perfil-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CareplusPerfilModel } from 'src/models/careplus-perfil/careplus-perfil.model';
import { of, throwError } from 'rxjs';

describe('CareplusPerfilComponent', () => {
  let component: CareplusPerfilComponent;
  let fixture: ComponentFixture<CareplusPerfilComponent>;
  let careplusPerfilService: CareplusPerfilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CareplusPerfilComponent,
        CareplusPerfilDeleteComponent
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
    fixture = TestBed.createComponent(CareplusPerfilComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(CareplusPerfilService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openCareplusPerfilDelete', () => {
    component.openCareplusPerfilDelete(new CareplusPerfilModel({}));
    expect(component.showCareplusPerfilDelete).toEqual(true);
  });

  it('getCareplusPerfils success', (done: DoneFn) => {
    const clientes = new CareplusPerfilModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusPerfilService, 'getAll').and.returnValue(of([clientes]));
    component.getCareplusPerfils();
    fixture.detectChanges();
    expect(component.showCareplusPerfilDelete).toEqual(false);
    done();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComponent } from './cliente.component';
import { ClienteDeleteComponent } from './cliente-delete/cliente-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';
import { ClienteModel } from 'src/models/cliente/cliente.model';
import { of, throwError } from 'rxjs';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clienteService: ClienteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClienteComponent,
        ClienteDeleteComponent
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
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.get(ClienteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openClienteDelete', () => {
    component.openClienteDelete(new ClienteModel({}));
    expect(component.showClienteDelete).toEqual(true);
  });

  it('getClientes success', (done: DoneFn) => {
    const clientes = new ClienteModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(clienteService, 'getAll').and.returnValue(of([clientes]));
    component.getClientes();
    fixture.detectChanges();
    expect(component.showClienteDelete).toEqual(false);
    done();
  });

  it('getClientes error', (done: DoneFn) => {
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(clienteService, 'getAll').and.returnValue(error);
    component.getClientes();
    fixture.detectChanges();
    expect(component.showClienteDelete).toEqual(false);
    done();
  });
});

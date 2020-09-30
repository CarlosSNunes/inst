import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDeleteComponent } from './cliente-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';
import { ClienteService } from '../cliente.service';
import { ClienteModel } from 'src/models/cliente/cliente.model';

describe('ClienteDeleteComponent', () => {
  let component: ClienteDeleteComponent;
  let fixture: ComponentFixture<ClienteDeleteComponent>;
  let clienteService: ClienteService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDeleteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.get(ClienteService);
    component.cliente = new ClienteModel({
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

  it('deleteCliente success', (done: DoneFn) => {
    spyOn(clienteService, 'delete').and.returnValue(of(null));
    component.deleteCliente();
    fixture.detectChanges();
    done();
    return;
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEditComponent } from './cliente-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteService } from '../cliente.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ClienteComponent } from '../cliente.component';
import { ClienteModel } from 'src/models/cliente/cliente.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';
import { ClienteDeleteComponent } from '../cliente-delete/cliente-delete.component';

describe('ClienteEditComponent', () => {
  let component: ClienteEditComponent;
  let fixture: ComponentFixture<ClienteEditComponent>;
  let clienteService: ClienteService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClienteEditComponent,
        ClienteComponent,
        ClienteDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/cliente', component: ClienteComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEditComponent);
    component = fixture.componentInstance;
    component.cliente = new ClienteModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    clienteService = TestBed.get(ClienteService);
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

  it('updateFileName', () => {
    const arquivos = [{ name: 'arquivo.png' }];
    component.updateFileName(arquivos);
    expect(component.arquivoNome).toEqual('arquivo.png');
  });

  it('updateFileName empty', () => {
    const arquivos = [];
    component.updateFileName(arquivos);
    expect(component.arquivo).toBeNull();
  });

  it('onSubmit', (done: DoneFn) => {
    component.createForm();
    fixture.detectChanges();
    component.onSubmit();
    expect(component.clienteForm.valid).toEqual(false);
    done();
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(clienteService, 'put').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.arquivo.setValue('arquivo.png');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.clienteForm.valid).toEqual(true);
    done();
  });
});

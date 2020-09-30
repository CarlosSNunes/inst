import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCreateComponent } from './cliente-create.component';
import { ClienteService } from '../cliente.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClienteComponent } from '../cliente.component';
import { ClienteDeleteComponent } from '../cliente-delete/cliente-delete.component';

describe('ClienteCreateComponent', () => {
  let component: ClienteCreateComponent;
  let fixture: ComponentFixture<ClienteCreateComponent>;
  let clienteService: ClienteService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClienteCreateComponent,
        ClienteComponent,
        ClienteDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {
              path: 'neocms/cliente',
              component: ClienteComponent
            }
          ]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCreateComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.get(ClienteService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('getErrors', () => {
    const descricao = component.f.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.createForm();
    component.onSubmit();
    expect(component.clienteForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(clienteService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.arquivo.setValue('arquivo.png');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.clienteForm.valid).toEqual(true);
    done();
  });
});

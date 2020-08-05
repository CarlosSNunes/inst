import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaEditComponent } from './pergunta-edit.component';
import { PerguntaService } from '../pergunta.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PerguntaComponent } from '../pergunta.component';
import { PerguntaDeleteComponent } from '../pergunta-delete/pergunta-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('PerguntaEditComponent', () => {
  let component: PerguntaEditComponent;
  let fixture: ComponentFixture<PerguntaEditComponent>;
  let perguntaService: PerguntaService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerguntaEditComponent,
        PerguntaComponent,
        PerguntaDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/documento-tipo', component: PerguntaComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaEditComponent);
    component = fixture.componentInstance;
    component.pergunta = new PerguntaModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    perguntaService = TestBed.get(PerguntaService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.perguntaForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.perguntaForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(perguntaService, 'put').and.returnValue(of(null));
    component.f.descricao.setValue('teste');
    component.f.resposta.setValue('teste');
    component.f.perguntaTipoId.setValue('1');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.perguntaForm.valid).toEqual(true);
    done();
  });
});

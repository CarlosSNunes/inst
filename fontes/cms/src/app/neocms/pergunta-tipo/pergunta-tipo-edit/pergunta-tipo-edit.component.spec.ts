import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaTipoEditComponent } from './pergunta-tipo-edit.component';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PerguntaTipoComponent } from '../pergunta-tipo.component';
import { PerguntaTipoDeleteComponent } from '../pergunta-tipo-delete/pergunta-tipo-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('PerguntaTipoEditComponent', () => {
  let component: PerguntaTipoEditComponent;
  let fixture: ComponentFixture<PerguntaTipoEditComponent>;
  let perguntaTipoService: PerguntaTipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerguntaTipoEditComponent,
        PerguntaTipoComponent,
        PerguntaTipoDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/pergunta-tipo', component: PerguntaTipoComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntaTipoEditComponent);
    component = fixture.componentInstance;
    component.perguntaTipo = new PerguntaTipoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
    perguntaTipoService = TestBed.get(PerguntaTipoService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.perguntaTipoForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.perguntaTipoForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(perguntaTipoService, 'put').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.perguntaTipoForm.valid).toEqual(true);
    done();
  });
});

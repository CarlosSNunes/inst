import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaTipoCreateComponent } from './pergunta-tipo-create.component';
import { PerguntaTipoService } from '../pergunta-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { PerguntaTipoComponent } from '../pergunta-tipo.component';
import { PerguntaTipoDeleteComponent } from '../pergunta-tipo-delete/pergunta-tipo-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('PerguntaTipoCreateComponent', () => {
  let component: PerguntaTipoCreateComponent;
  let fixture: ComponentFixture<PerguntaTipoCreateComponent>;
  let perguntaTipoService: PerguntaTipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerguntaTipoCreateComponent,
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
    fixture = TestBed.createComponent(PerguntaTipoCreateComponent);
    component = fixture.componentInstance;
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
    spyOn(perguntaTipoService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.perguntaTipoForm.valid).toEqual(true);
    done();
  });
});

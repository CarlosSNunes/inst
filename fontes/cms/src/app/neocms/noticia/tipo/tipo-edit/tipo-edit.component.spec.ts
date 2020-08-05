import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEditComponent } from './tipo-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TipoService } from '../tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { of } from 'rxjs';
import { TipoComponent } from '../tipo.component';
import { TipoDeleteComponent } from '../tipo-delete/tipo-delete.component';

describe('TipoEditComponent', () => {
  let component: TipoEditComponent;
  let fixture: ComponentFixture<TipoEditComponent>;
  let tipoService: TipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TipoEditComponent,
        TipoComponent,
        TipoDeleteComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/noticia/tipo', component: TipoComponent }]
        ),
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEditComponent);
    component = fixture.componentInstance;
    tipoService = TestBed.get(TipoService);
    authenticateService = TestBed.get(AuthenticationService);
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTag', (done: DoneFn) => {
    spyOn(tipoService, 'getById').and.returnValue(of(new NoticiaTipoModel({ id: 1 })));
    component.getNoticiaTipo();
    fixture.detectChanges();
    expect(component.noticiaTipo).not.toBeNull();
    done();
  });

  it('getErrors', () => {
    component.createForm();
    const descricao = component.noticiaTipoForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit invalid', () => {
    component.onSubmit();
    expect(component.noticiaTipoForm.valid).toEqual(false);
  });

  it('onSubmit valid', (done: DoneFn) => {
    component.noticiaTipo = new NoticiaTipoModel({ id: 1, descricao: 'Saude' });
    component.updateForm();
    spyOn(tipoService, 'put').and.returnValue(of(null));
    component.noticiaTipoForm.controls.descricao.setValue('descrição');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.noticiaTipoForm.valid).toEqual(true);
    done();
  });
});

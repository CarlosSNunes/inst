import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTipoCreateComponent } from './documento-tipo-create.component';
import { DocumentoTipoService } from '../documento-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { DocumentoTipoComponent } from '../documento-tipo.component';
import { DocumentoTipoDeleteComponent } from '../documento-tipo-delete/documento-tipo-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('DocumentoTipoCreateComponent', () => {
  let component: DocumentoTipoCreateComponent;
  let fixture: ComponentFixture<DocumentoTipoCreateComponent>;
  let documentoTipoService: DocumentoTipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoTipoCreateComponent,
        DocumentoTipoComponent,
        DocumentoTipoDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/documento-tipo', component: DocumentoTipoComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTipoCreateComponent);
    component = fixture.componentInstance;
    documentoTipoService = TestBed.get(DocumentoTipoService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.documentoTipoForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.documentoTipoForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(documentoTipoService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.documentoTipoForm.valid).toEqual(true);
    done();
  });
});

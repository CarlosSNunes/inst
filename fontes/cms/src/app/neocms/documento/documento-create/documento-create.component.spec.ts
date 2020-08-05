import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoCreateComponent } from './documento-create.component';
import { DocumentoService } from '../documento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { DocumentoComponent } from '../documento.component';
import { DocumentoDeleteComponent } from '../documento-delete/documento-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('DocumentoCreateComponent', () => {
  let component: DocumentoCreateComponent;
  let fixture: ComponentFixture<DocumentoCreateComponent>;
  let documentoService: DocumentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoCreateComponent,
        DocumentoComponent,
        DocumentoDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {
              path: 'neocms/documento',
              component: DocumentoComponent
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
    fixture = TestBed.createComponent(DocumentoCreateComponent);
    component = fixture.componentInstance;
    documentoService = TestBed.get(DocumentoService);
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

  it('onSubmit', () => {
    component.createForm();
    component.onSubmit();
    expect(component.documentoForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(documentoService, 'post').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.arquivo.setValue('arquivo.png');
    component.f.careplusPerfilId.setValue('1');
    component.f.documentoTipoId.setValue('1');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.documentoForm.valid).toEqual(true);
    done();
  });
});

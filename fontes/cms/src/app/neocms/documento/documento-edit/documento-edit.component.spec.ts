import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoEditComponent } from './documento-edit.component';
import { DocumentoService } from '../documento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { DocumentoComponent } from '../documento.component';
import { DocumentoDeleteComponent } from '../documento-delete/documento-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of, throwError } from 'rxjs';

describe('DocumentoEditComponent', () => {
  let component: DocumentoEditComponent;
  let fixture: ComponentFixture<DocumentoEditComponent>;
  let documentoService: DocumentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoEditComponent,
        DocumentoComponent,
        DocumentoDeleteComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/documento', component: DocumentoComponent }]
        ),
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoEditComponent);
    component = fixture.componentInstance;
    component.documento = new DocumentoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });
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
    expect(component.documentoForm.valid).toEqual(false);
    done();
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(documentoService, 'put').and.returnValue(of(null));
    component.f.descricao.setValue('titulo');
    component.f.arquivo.setValue('arquivo.png');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.documentoForm.valid).toEqual(true);
    done();
  });
});

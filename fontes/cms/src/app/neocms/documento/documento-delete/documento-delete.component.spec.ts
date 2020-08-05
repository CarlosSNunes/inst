import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoDeleteComponent } from './documento-delete.component';
import { DocumentoService } from '../documento.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('DocumentoDeleteComponent', () => {
  let component: DocumentoDeleteComponent;
  let fixture: ComponentFixture<DocumentoDeleteComponent>;
  let documentoService: DocumentoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoDeleteComponent);
    component = fixture.componentInstance;
    documentoService = TestBed.get(DocumentoService);
    component.documento = new DocumentoModel({
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

  it('deleteDocumento success', (done: DoneFn) => {
    spyOn(documentoService, 'delete').and.returnValue(of(null));
    component.deleteDocumento();
    fixture.detectChanges();
    done();
    return;
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTipoDeleteComponent } from './documento-tipo-delete.component';
import { DocumentoTipoService } from '../documento-tipo.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('DocumentoTipoDeleteComponent', () => {
  let component: DocumentoTipoDeleteComponent;
  let fixture: ComponentFixture<DocumentoTipoDeleteComponent>;
  let documentoTipoService: DocumentoTipoService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoTipoDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTipoDeleteComponent);
    component = fixture.componentInstance;
    documentoTipoService = TestBed.get(DocumentoTipoService);
    component.documentoTipo = new DocumentoTipoModel({
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

  it('deleteDocumentoTipo success', (done: DoneFn) => {
    spyOn(documentoTipoService, 'delete').and.returnValue(of(null));
    component.deleteDocumentoTipo();
    fixture.detectChanges();
    done();
    return;
  });
});

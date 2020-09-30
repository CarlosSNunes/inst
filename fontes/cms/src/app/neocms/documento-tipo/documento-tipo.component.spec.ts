import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTipoComponent } from './documento-tipo.component';
import { DocumentoTipoService } from './documento-tipo.service';
import { DocumentoTipoDeleteComponent } from './documento-tipo-delete/documento-tipo-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoTipoModel } from 'src/models/documento-tipo/documento-tipo.model';
import { of, throwError } from 'rxjs';

describe('DocumentoTipoComponent', () => {
  let component: DocumentoTipoComponent;
  let fixture: ComponentFixture<DocumentoTipoComponent>;
  let careplusPerfilService: DocumentoTipoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoTipoComponent,
        DocumentoTipoDeleteComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTipoComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(DocumentoTipoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openDocumentoTipoDelete', () => {
    component.openDocumentoTipoDelete(new DocumentoTipoModel({}));
    expect(component.showDocumentoTipoDelete).toEqual(true);
  });

  it('getDocumentoTipos success', (done: DoneFn) => {
    const clientes = new DocumentoTipoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusPerfilService, 'getAll').and.returnValue(of([clientes]));
    component.getDocumentoTipos();
    fixture.detectChanges();
    expect(component.showDocumentoTipoDelete).toEqual(false);
    done();
  });
});

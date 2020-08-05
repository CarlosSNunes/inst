import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoComponent } from './documento.component';
import { DocumentoService } from './documento.service';
import { DocumentoDeleteComponent } from './documento-delete/documento-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentoModel } from 'src/models/documento/documento.model';
import { of, throwError } from 'rxjs';

describe('DocumentoComponent', () => {
  let component: DocumentoComponent;
  let fixture: ComponentFixture<DocumentoComponent>;
  let careplusPerfilService: DocumentoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentoComponent,
        DocumentoDeleteComponent
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
    fixture = TestBed.createComponent(DocumentoComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(DocumentoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openDocumentoDelete', () => {
    component.openDocumentoDelete(new DocumentoModel({}));
    expect(component.showDocumentoDelete).toEqual(true);
  });

  it('getDocumentos success', (done: DoneFn) => {
    const clientes = new DocumentoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusPerfilService, 'getAll').and.returnValue(of([clientes]));
    component.getDocumentos();
    fixture.detectChanges();
    expect(component.showDocumentoDelete).toEqual(false);
    done();
  });

  it('getDocumentos error', (done: DoneFn) => {
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(careplusPerfilService, 'getAll').and.returnValue(error);
    component.getDocumentos();
    fixture.detectChanges();
    expect(component.showDocumentoDelete).toEqual(false);
    done();
  });
});

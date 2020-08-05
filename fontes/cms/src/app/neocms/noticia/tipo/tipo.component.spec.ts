import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoComponent } from './tipo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TipoService } from './tipo.service';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { of, throwError } from 'rxjs';
import { TipoDeleteComponent } from './tipo-delete/tipo-delete.component';

describe('TipoComponent', () => {
  let component: TipoComponent;
  let fixture: ComponentFixture<TipoComponent>;
  let tipoService: TipoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TipoComponent,
        TipoDeleteComponent
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
    fixture = TestBed.createComponent(TipoComponent);
    component = fixture.componentInstance;
    tipoService = TestBed.get(TipoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openTipoDelete', () => {
    const tipo = new NoticiaTipoModel({ id: 1, descricao: 'Saúde' });
    component.openNoticiaTipoDelete(tipo);
    expect(component.showNoticiaTipoDelete).toEqual(true);
  });

  it('gettipos', (done: DoneFn) => {
    const tipo = new NoticiaTipoModel({ id: 1, descricao: 'Saúde' });
    spyOn(tipoService, 'getAll').and.returnValue(of([tipo]));
    component.getNoticiaTipos();
    fixture.detectChanges();
    expect(component.showNoticiaTipoDelete).toEqual(false);
    done();
  });

  it('gettipos', (done: DoneFn) => {
    const errorMessage = {status: 404};
    const error = throwError(errorMessage);
    spyOn(tipoService, 'getAll').and.returnValue(error);
    component.getNoticiaTipos();
    fixture.detectChanges();
    expect(component.showNoticiaTipoDelete).toEqual(false);
    done();
  });
});

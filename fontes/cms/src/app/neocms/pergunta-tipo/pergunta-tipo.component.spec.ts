import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaTipoComponent } from './pergunta-tipo.component';
import { PerguntaTipoService } from './pergunta-tipo.service';
import { PerguntaTipoDeleteComponent } from './pergunta-tipo-delete/pergunta-tipo-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaTipoModel } from 'src/models/pergunta-tipo/pergunta-tipo.model';
import { of, throwError } from 'rxjs';

describe('PerguntaTipoComponent', () => {
  let component: PerguntaTipoComponent;
  let fixture: ComponentFixture<PerguntaTipoComponent>;
  let careplusPerfilService: PerguntaTipoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerguntaTipoComponent,
        PerguntaTipoDeleteComponent
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
    fixture = TestBed.createComponent(PerguntaTipoComponent);
    component = fixture.componentInstance;
    careplusPerfilService = TestBed.get(PerguntaTipoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openPerguntaTipoDelete', () => {
    component.openPerguntaTipoDelete(new PerguntaTipoModel({}));
    expect(component.showPerguntaTipoDelete).toEqual(true);
  });

  it('getPerguntaTipos success', (done: DoneFn) => {
    const clientes = new PerguntaTipoModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(careplusPerfilService, 'getAll').and.returnValue(of([clientes]));
    component.getPerguntaTipos();
    fixture.detectChanges();
    expect(component.showPerguntaTipoDelete).toEqual(false);
    done();
  });
});

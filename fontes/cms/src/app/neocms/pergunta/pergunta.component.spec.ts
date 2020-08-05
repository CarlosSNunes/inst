import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaComponent } from './pergunta.component';
import { PerguntaService } from './pergunta.service';
import { PerguntaDeleteComponent } from './pergunta-delete/pergunta-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerguntaModel } from 'src/models/pergunta/pergunta.model';
import { of, throwError } from 'rxjs';

describe('PerguntaComponent', () => {
  let component: PerguntaComponent;
  let fixture: ComponentFixture<PerguntaComponent>;
  let perguntaService: PerguntaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerguntaComponent,
        PerguntaDeleteComponent
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
    fixture = TestBed.createComponent(PerguntaComponent);
    component = fixture.componentInstance;
    perguntaService = TestBed.get(PerguntaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openPerguntaDelete', () => {
    component.openPerguntaDelete(new PerguntaModel({}));
    expect(component.showPerguntaDelete).toEqual(true);
  });

  it('getPerguntas success', (done: DoneFn) => {
    const clientes = new PerguntaModel({
      id: 1,
      descricao: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(perguntaService, 'getAll').and.returnValue(of([clientes]));
    component.getPerguntas();
    fixture.detectChanges();
    expect(component.showPerguntaDelete).toEqual(false);
    done();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaIndexComponent } from './noticia-index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoticiaService } from '../noticia.service';
import { NoticiaDeleteComponent } from '../noticia-delete/noticia-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { BlocoModel } from 'src/models/bloco/bloco.model';
import { TagModel } from 'src/models/tag/tag.model';
import { of, throwError } from 'rxjs';

describe('IndexComponent', () => {
  let component: NoticiaIndexComponent;
  let fixture: ComponentFixture<NoticiaIndexComponent>;
  let noticiaService: NoticiaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoticiaIndexComponent,
        NoticiaDeleteComponent
      ],
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaIndexComponent);
    component = fixture.componentInstance;
    noticiaService = TestBed.get(NoticiaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openNoticiaDelete', () => {
    const tag = new TagModel({ id: 1, descricao: 'Saúde' });
    const bloco = new BlocoModel({ id: 1, titulo: 'Saúde', descricao: 'descrição' });
    const noticiaTipo = new NoticiaTipoModel({ id: 1, descricao: 'descrição' });

    const noticia = new NoticiaModel({
      id: 1,
      noticiaTag: [tag],
      bloco: [bloco],
      titulo: 'titulo',
      noticiaTipoId: 1,
      noticiaTipo,
      dataCadastro: new Date(),
      dataPublicacao: new Date()
    });
    component.openNoticiaDelete(noticia);
    expect(component.showNoticiaDelete).toEqual(true);
  });

  it('getNoticias', (done: DoneFn) => {
    const tag = new TagModel({ id: 1, descricao: 'Saúde' });
    const bloco = new BlocoModel({ id: 1, titulo: 'Saúde', descricao: 'descrição' });
    const noticiaTipo = new NoticiaTipoModel({ id: 1, descricao: 'descrição' });

    const noticia = new NoticiaModel({
      id: 1,
      noticiaTag: [tag],
      bloco: [bloco],
      titulo: 'titulo',
      noticiaTipoId: 1,
      noticiaTipo,
      dataCadastro: new Date(),
      dataPublicacao: new Date()
    });

    spyOn(noticiaService, 'getAll').and.returnValue(of([noticia]));
    component.getNoticias();
    fixture.detectChanges();
    expect(component.showNoticiaDelete).toEqual(false);
    done();
  });

  it('getNoticias', (done: DoneFn) => {
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(noticiaService, 'getAll').and.returnValue(error);
    component.getNoticias();
    fixture.detectChanges();
    expect(component.showNoticiaDelete).toEqual(false);
    done();
  });
});

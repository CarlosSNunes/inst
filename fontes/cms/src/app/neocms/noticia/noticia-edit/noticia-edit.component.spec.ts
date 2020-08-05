import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as BulmaCalendar from 'src/assets/js/bulma-calendar';
import { NoticiaEditComponent } from './noticia-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { TagModel } from 'src/models/tag/tag.model';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { BlocoModel } from 'src/models/bloco/bloco.model';
import { NoticiaTipoModel } from 'src/models/noticia-tipo/noticia-tipo.model';
import { NoticiaService } from '../noticia.service';
import { TipoService } from '../tipo/tipo.service';
import { TagService } from '../tag/tag.service';
import { of } from 'rxjs';
import { NoticiaIndexComponent } from '../noticia-index/noticia-index.component';
import { NoticiaDeleteComponent } from '../noticia-delete/noticia-delete.component';

describe('NoticiaEditComponent', () => {
  let component: NoticiaEditComponent;
  let fixture: ComponentFixture<NoticiaEditComponent>;
  let authenticateService: AuthenticationService;
  let noticiaService: NoticiaService;
  let noticiaTipoService: TipoService;
  let tagService: TagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoticiaEditComponent,
        NoticiaIndexComponent,
        NoticiaDeleteComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule.withRoutes(
          [
            {
              path: 'neocms/noticia/index',
              component: NoticiaIndexComponent
            }
          ]
        ),
        ReactiveFormsModule,
        CKEditorModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture = TestBed.createComponent(NoticiaEditComponent);
    component = fixture.componentInstance;
    noticiaService = TestBed.get(NoticiaService);
    noticiaTipoService = TestBed.get(TipoService);
    tagService = TestBed.get(TagService);
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
    component.noticia = noticia;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getNoticia data expiração nula', (done: DoneFn) => {
    spyOn(noticiaService, 'getById').and.returnValue(of(component.noticia));
    component.getNoticia();
    expect(component.noticia).not.toBeNull();
    fixture.detectChanges();
    done();
  });

  it('getNoticia data expiração preenchida', (done: DoneFn) => {
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
      dataPublicacao: new Date(),
      dataExpiracao: new Date()
    });

    spyOn(noticiaService, 'getById').and.returnValue(of(noticia));
    component.getNoticia();
    expect(component.noticia).not.toBeNull();
    fixture.detectChanges();
    done();
  });

  it('getTags', (done: DoneFn) => {
    const tag = new TagModel({ id: 1, descricao: 'Saúde' });
    spyOn(tagService, 'getAll').and.returnValue(of([tag]));
    component.getTags();
    expect(component.tags).not.toBeNull();
    fixture.detectChanges();
    done();
  });

  it('getTipos', (done: DoneFn) => {
    spyOn(noticiaTipoService, 'getAll').and.returnValue(of([]));
    component.getTipos();
    expect(component.tipos).not.toBeNull();
    fixture.detectChanges();
    done();
  });

  it('updateForm', () => {
    component.updateForm();
    expect(component.noticiaForm).not.toBeNull();
  });

  it('updateBlocos', () => {
    component.updateBlocos();
    expect(component.noticiaForm).not.toBeNull();
  });

  it('f', () => {
    expect(component.f).not.toBeNull();
  });

  it('blocos', () => {
    expect(component.blocos).not.toBeNull();
  });

  it('tagControls', () => {
    expect(component.tagControls).not.toBeNull();
  });

  it('manageTag add', () => {
    component.manageTag(2);
    expect(component.tagControls).not.toBeNull();
  });

  it('manageTag remove', () => {
    component.manageTag(1);
    component.manageTag(1);

    expect(component.tagControls).not.toBeNull();
  });

  it('toggleTag', () => {
    const tag = new TagModel({ id: 1, selected: null });
    component.tags = [tag];
    component.toggleTag(tag);

    expect(component.tagControls).not.toBeNull();
  });

  it('addBloco', () => {
    component.addBloco();

    expect(component.blocos).not.toBeNull();
  });

  it('removeBloco', () => {
    component.addBloco();
    component.removeBloco(0);

    expect(component.blocos).not.toBeNull();
  });

  it('updateFileName', () => {
    const arquivo = { name: '' };
    const arquivos = [arquivo];
    component.updateFileName(arquivos);

    expect(component.arquivoNome).toEqual(arquivo.name);
  });

  it('updateFileName null', () => {
    const arquivos = [];
    component.updateFileName(arquivos);

    expect(component.arquivo).toBeUndefined();
  });

  it('validateDate', () => {
    component.validateDate(new Date());

    expect(component.f.dataPublicacao.errors).toBeNull();
  });

  it('validateDate null', () => {
    component.validateDate(null);

    expect(component.f.dataPublicacao.errors).toEqual({ required: true });
  });

  it('getErrors', () => {
    component.validateDate(null);
    const result = component.getErrors(component.f.dataPublicacao);

    expect(result).not.toBeNull();
  });

  it('onSubmit invalid', (done: DoneFn) => {
    spyOn(noticiaService, 'getById').and.returnValue(of(component.noticia));
    component.getNoticia();
    fixture.detectChanges();
    component.onSubmit();

    expect(component.noticiaForm.valid).toEqual(false);
    done();
  });

  it('onSubmit valid dataExpiracao not null', (done: DoneFn) => {
    spyOn(noticiaService, 'put').and.returnValue(of(null));
    BulmaCalendar.attach('#dataExpiracao', component.optionsDate);
    BulmaCalendar.attach('#dataPublicacao', component.optionsDate);
    component.updateForm();
    component.addTag(1);

    const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');
    dataExpiracaoElement.bulmaCalendar.date.start = new Date();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.noticiaForm.valid).toEqual(true);
    done();
  });

  it('onSubmit valid dataExpiracao null', (done: DoneFn) => {
    spyOn(noticiaService, 'put').and.returnValue(of(null));
    BulmaCalendar.attach('#dataExpiracao', component.optionsDate);
    BulmaCalendar.attach('#dataPublicacao', component.optionsDate);
    component.updateForm();
    component.addTag(1);

    const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');
    dataExpiracaoElement.bulmaCalendar.date.start = '';

    component.onSubmit();
    fixture.detectChanges();

    expect(component.noticiaForm.valid).toEqual(true);
    done();
  });
});

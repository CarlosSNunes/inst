import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaCreateComponent } from './noticia-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { TagModel } from 'src/models/tag/tag.model';
import { NoticiaService } from '../noticia.service';
import { of } from 'rxjs';
import { TipoService } from '../tipo/tipo.service';
import { TagService } from '../tag/tag.service';

describe('CreateComponent', () => {
  let component: NoticiaCreateComponent;
  let fixture: ComponentFixture<NoticiaCreateComponent>;
  let authenticateService: AuthenticationService;
  let noticiaService: NoticiaService;
  let noticiaTipoService: TipoService;
  let tagService: TagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoticiaCreateComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CKEditorModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture = TestBed.createComponent(NoticiaCreateComponent);
    component = fixture.componentInstance;
    noticiaService = TestBed.get(NoticiaService);
    noticiaTipoService = TestBed.get(TipoService);
    tagService = TestBed.get(TagService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', (done: DoneFn) => {
    spyOn(noticiaTipoService, 'getAll').and.returnValue(of([]));
    spyOn(tagService, 'getAll').and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    done();
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
    component.manageTag(1);
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

  it('onSubmit invalid', () => {
    component.onSubmit();

    expect(component.noticiaForm.valid).toEqual(false);
  });

  it('onSubmit valid dataExpiracao null', (done: DoneFn) => {
    spyOn(noticiaService, 'post').and.returnValue(of(null));
    component.f.titulo.setValue('Titulo');
    component.f.dataPublicacao.setValue('2020-01-27');
    component.f.noticiaTipoId.setValue('1');
    (component.blocos.get('0') as FormGroup).controls.titulo.setValue('Titulo');
    (component.blocos.get('0') as FormGroup).controls.descricao.setValue('descrição');

    component.addTag(1);

    const dataExpiracaoElement: any = document.querySelector('#dataExpiracao');

    dataExpiracaoElement.bulmaCalendar.date.start = '';

    component.onSubmit();
    fixture.detectChanges();

    expect(component.noticiaForm.valid).toEqual(true);
    done();
  });

  it('onSubmit valid dataExpiracao not null', (done: DoneFn) => {
    spyOn(noticiaService, 'post').and.returnValue(of(null));
    component.f.titulo.setValue('Titulo');
    component.f.dataPublicacao.setValue('2020-01-27');
    component.f.noticiaTipoId.setValue('1');
    (component.blocos.get('0') as FormGroup).controls.titulo.setValue('Titulo');
    (component.blocos.get('0') as FormGroup).controls.descricao.setValue('descrição');

    component.addTag(1);

    component.onSubmit();
    fixture.detectChanges();

    expect(component.noticiaForm.valid).toEqual(true);
    done();
  });
});

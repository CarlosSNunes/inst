import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaDeleteComponent } from './noticia-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoticiaService } from '../noticia.service';
import { of } from 'rxjs';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

describe('NoticiaDeleteComponent', () => {
  let component: NoticiaDeleteComponent;
  let fixture: ComponentFixture<NoticiaDeleteComponent>;
  let noticiaService: NoticiaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoticiaDeleteComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
    noticiaService = TestBed.get(NoticiaService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', (done: DoneFn) => {
    component.onClose.subscribe(event => {
      expect(event).toBeNull();
      done();
    });
    component.closeModal();
  });

  it('deleteNoticia', (done: DoneFn) => {
    component.noticia = new NoticiaModel({ id: 1, bloco: [], noticiaTag: [] });
    component.usuario = new UserAuthenticateModel({ token: '123', perfis: [] });
    spyOn(noticiaService, 'delete').and.returnValue(of(null));
    component.deleteNoticia();
    fixture.detectChanges();
    done();
  });
});

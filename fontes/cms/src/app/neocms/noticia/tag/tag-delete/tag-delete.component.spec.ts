import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagDeleteComponent } from './tag-delete.component';
import { TagService } from '../tag.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TagModel } from 'src/models/tag/tag.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';

describe('TagDeleteComponent', () => {
  let component: TagDeleteComponent;
  let fixture: ComponentFixture<TagDeleteComponent>;
  let tagService: TagService;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagDeleteComponent],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDeleteComponent);
    component = fixture.componentInstance;
    tagService = TestBed.get(TagService);
    authenticationService = TestBed.get(AuthenticationService);
    component.tag = new TagModel({ id: 1, descricao: 'teste' });
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', () => {
    component.closeModal();
    expect(component.onClose).not.toBeNull();
  });

  it('deleteTag', (done: DoneFn) => {
    spyOn(tagService, 'delete').and.returnValue(of(true));
    component.usuario = new UserAuthenticateModel({ perfis: [], token: '123' });
    component.deleteTag();
    fixture.detectChanges();
    expect(component.onClose).not.toBeNull();
    done();
  });
});

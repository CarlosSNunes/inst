import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreateComponent } from './tag-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { TagService } from '../tag.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';

describe('TagCreateComponent', () => {
  let component: TagCreateComponent;
  let fixture: ComponentFixture<TagCreateComponent>;
  let tagService: TagService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagCreateComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreateComponent);
    component = fixture.componentInstance;
    tagService = TestBed.get(TagService);
    authenticateService = TestBed.get(AuthenticationService);
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addTag', () => {
    component.addTag();
    expect(component.tags).not.toBeNull();
  });

  it('removeTag', () => {
    component.addTag();
    component.removeTag(1);
    expect(component.tags).not.toBeNull();
  });

  it('getErrors', () => {
    const descricao = (component.tags.get('0') as FormGroup).controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.tagForm.valid).toEqual(false);
  });

  it('onSubmit', (done: DoneFn) => {
    spyOn(tagService, 'post').and.returnValue(of(null));
    (component.tags.get('0') as FormGroup).controls.descricao.setValue('descrição');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.tagForm.valid).toEqual(true);
    done();
  });
});

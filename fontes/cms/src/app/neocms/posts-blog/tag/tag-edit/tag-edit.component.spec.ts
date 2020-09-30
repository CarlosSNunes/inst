import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditComponent } from './tag-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagService } from '../tag.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { of } from 'rxjs';
import { TagModel } from 'src/models/tag/tag.model';

describe('TagEditComponent', () => {
  let component: TagEditComponent;
  let fixture: ComponentFixture<TagEditComponent>;
  let tagService: TagService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagEditComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditComponent);
    component = fixture.componentInstance;
    tagService = TestBed.get(TagService);
    authenticateService = TestBed.get(AuthenticationService);
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTag', (done: DoneFn) => {
    spyOn(tagService, 'getById').and.returnValue(of(new TagModel({ id: 1 })));
    component.getTag();
    fixture.detectChanges();
    expect(component.tag).not.toBeNull();
    done();
  });

  it('getErrors', () => {
    component.createForm();
    const descricao = component.tagForm.controls.descricao;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('onSubmit invalid', () => {
    component.onSubmit();
    expect(component.tagForm.valid).toEqual(false);
  });

  it('onSubmit valid', (done: DoneFn) => {
    component.tag = new TagModel({ id: 1, descricao: 'Saude' });
    component.updateForm();
    spyOn(tagService, 'put').and.returnValue(of(null));
    component.tagForm.controls.descricao.setValue('descrição');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.tagForm.valid).toEqual(true);
    done();
  });
});

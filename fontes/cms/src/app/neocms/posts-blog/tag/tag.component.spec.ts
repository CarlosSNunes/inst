import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { TagDeleteComponent } from './tag-delete/tag-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagService } from './tag.service';
import { of, throwError } from 'rxjs';
import { TagModel } from 'src/models/tag/tag.model';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  let tagService: TagService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagComponent,
        TagDeleteComponent
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
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    tagService = TestBed.get(TagService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openTagDelete', () => {
    const tag = new TagModel({ id: 1, descricao: 'Saúde' });
    component.openTagDelete(tag);
    expect(component.showTagDelete).toEqual(true);
  });

  it('getTags', (done: DoneFn) => {
    const tag = new TagModel({ id: 1, descricao: 'Saúde' });
    spyOn(tagService, 'getAll').and.returnValue(of([tag]));
    component.getTags();
    fixture.detectChanges();
    expect(component.showTagDelete).toEqual(false);
    done();
  });

  it('getTags', (done: DoneFn) => {
    const errorMessage = {status: 404};
    const error = throwError(errorMessage);
    spyOn(tagService, 'getAll').and.returnValue(error);
    component.getTags();
    fixture.detectChanges();
    expect(component.showTagDelete).toEqual(false);
    done();
  });
});

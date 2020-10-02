import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommomQuestionsComponent } from './commom-questions.component';

describe('CommomQuestionsComponent', () => {
  let component: CommomQuestionsComponent;
  let fixture: ComponentFixture<CommomQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommomQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommomQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

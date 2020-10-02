import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSystemComponent } from './personal-system.component';

describe('PersonalSystemComponent', () => {
  let component: PersonalSystemComponent;
  let fixture: ComponentFixture<PersonalSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

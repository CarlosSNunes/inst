import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactScheduleAVisitComponent } from './contact-schedule-a-visit.component';

describe('ContactScheduleAVisitComponent', () => {
  let component: ContactScheduleAVisitComponent;
  let fixture: ComponentFixture<ContactScheduleAVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactScheduleAVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactScheduleAVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDatesComponent } from './see-dates.component';

describe('SeeDatesComponent', () => {
  let component: SeeDatesComponent;
  let fixture: ComponentFixture<SeeDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

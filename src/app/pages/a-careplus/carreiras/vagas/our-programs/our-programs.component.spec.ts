import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProgramsComponent } from './our-programs.component';

describe('OurProgramsComponent', () => {
  let component: OurProgramsComponent;
  let fixture: ComponentFixture<OurProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

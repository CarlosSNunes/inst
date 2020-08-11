import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDifferentialsComponent } from './our-differentials.component';

describe('OurDifferentialsComponent', () => {
  let component: OurDifferentialsComponent;
  let fixture: ComponentFixture<OurDifferentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurDifferentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDifferentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

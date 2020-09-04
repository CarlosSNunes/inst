import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurDisponibleVacanciesComponent } from './our-disponible-vacancies.component';

describe('OurDisponibleVacanciesComponent', () => {
  let component: OurDisponibleVacanciesComponent;
  let fixture: ComponentFixture<OurDisponibleVacanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurDisponibleVacanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurDisponibleVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

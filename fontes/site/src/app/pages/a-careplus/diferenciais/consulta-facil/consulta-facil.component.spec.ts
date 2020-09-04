import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFacilComponent } from './consulta-facil.component';

describe('CarreiraDetalhesComponent', () => {
  let component: ConsultaFacilComponent;
  let fixture: ComponentFixture<ConsultaFacilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaFacilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaFacilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

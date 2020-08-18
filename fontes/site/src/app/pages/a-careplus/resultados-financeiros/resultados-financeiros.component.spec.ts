import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosFinanceirosComponent } from './resultados-financeiros.component';

describe('ResultadosFinanceirosComponent', () => {
  let component: ResultadosFinanceirosComponent;
  let fixture: ComponentFixture<ResultadosFinanceirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosFinanceirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosFinanceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

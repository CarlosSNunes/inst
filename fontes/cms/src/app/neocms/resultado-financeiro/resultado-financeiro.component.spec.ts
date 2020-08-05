import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFinanceiroComponent } from './resultado-financeiro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResultadoFinanceiroDeleteComponent } from './resultado-financeiro-delete/resultado-financeiro-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultadoFinanceiroComponent', () => {
  let component: ResultadoFinanceiroComponent;
  let fixture: ComponentFixture<ResultadoFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultadoFinanceiroComponent,
        ResultadoFinanceiroDeleteComponent
      ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

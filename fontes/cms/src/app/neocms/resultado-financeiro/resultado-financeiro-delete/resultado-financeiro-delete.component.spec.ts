import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFinanceiroDeleteComponent } from './resultado-financeiro-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultadoFinanceiroDeleteComponent', () => {
  let component: ResultadoFinanceiroDeleteComponent;
  let fixture: ComponentFixture<ResultadoFinanceiroDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultadoFinanceiroDeleteComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoFinanceiroDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

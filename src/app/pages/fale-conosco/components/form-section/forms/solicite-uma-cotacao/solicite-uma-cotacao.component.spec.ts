import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliciteUmaCotacaoComponent } from './solicite-uma-cotacao.component';

describe('SoliciteUmaCotacaoComponent', () => {
  let component: SoliciteUmaCotacaoComponent;
  let fixture: ComponentFixture<SoliciteUmaCotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoliciteUmaCotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoliciteUmaCotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

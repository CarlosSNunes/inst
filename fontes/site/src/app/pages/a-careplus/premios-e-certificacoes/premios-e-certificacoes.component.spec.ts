import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiosECertificacoesComponent } from './premios-e-certificacoes.component';

describe('PremiosECertificacoesComponent', () => {
  let component: PremiosECertificacoesComponent;
  let fixture: ComponentFixture<PremiosECertificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosECertificacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiosECertificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

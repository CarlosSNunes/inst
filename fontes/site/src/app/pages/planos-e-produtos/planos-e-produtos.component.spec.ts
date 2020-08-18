import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosEProdutosComponent } from './planos-e-produtos.component';

describe('PlanosEProdutosComponent', () => {
  let component: PlanosEProdutosComponent;
  let fixture: ComponentFixture<PlanosEProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanosEProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanosEProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

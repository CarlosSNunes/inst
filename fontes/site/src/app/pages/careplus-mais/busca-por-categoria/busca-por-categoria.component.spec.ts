import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaPorCategoriaComponent } from './busca-por-categoria.component';

describe('BuscaPorCategoriaComponent', () => {
  let component: BuscaPorCategoriaComponent;
  let fixture: ComponentFixture<BuscaPorCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaPorCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

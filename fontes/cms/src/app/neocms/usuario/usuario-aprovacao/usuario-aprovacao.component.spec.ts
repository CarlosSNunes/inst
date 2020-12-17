import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAprovacaoComponent } from './usuario-aprovacao.component';

describe('UsuarioAprovacaoComponent', () => {
  let component: UsuarioAprovacaoComponent;
  let fixture: ComponentFixture<UsuarioAprovacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAprovacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

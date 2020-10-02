import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredenciadoComponent } from './credenciado.component';

describe('CredenciadoComponent', () => {
  let component: CredenciadoComponent;
  let fixture: ComponentFixture<CredenciadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredenciadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredenciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

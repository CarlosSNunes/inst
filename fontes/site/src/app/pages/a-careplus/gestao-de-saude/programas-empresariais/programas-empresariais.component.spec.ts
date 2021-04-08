import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasEmpresariaisComponent } from './programas-empresariais.component';

describe('ProgramasEmpresariaisComponent', () => {
  let component: ProgramasEmpresariaisComponent;
  let fixture: ComponentFixture<ProgramasEmpresariaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramasEmpresariaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasEmpresariaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

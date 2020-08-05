import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasPreventivosComponent } from './programas-preventivos.component';

describe('ProgramasPreventivosComponent', () => {
  let component: ProgramasPreventivosComponent;
  let fixture: ComponentFixture<ProgramasPreventivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramasPreventivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramasPreventivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

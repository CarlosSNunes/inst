import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinaOcupacionalComponent } from './medicina-ocupacional.component';

describe('MedicinaOcupacionalComponent', () => {
  let component: MedicinaOcupacionalComponent;
  let fixture: ComponentFixture<MedicinaOcupacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinaOcupacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinaOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NossasParceriasComponent } from './nossas-parcerias.component';

describe('NossasParceriasComponent', () => {
  let component: NossasParceriasComponent;
  let fixture: ComponentFixture<NossasParceriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NossasParceriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NossasParceriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

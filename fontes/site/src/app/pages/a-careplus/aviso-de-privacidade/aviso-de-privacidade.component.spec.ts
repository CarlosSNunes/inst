import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoDePrivacidadeComponent } from './aviso-de-privacidade.component';

describe('AvisoDePrivacidadeComponent', () => {
  let component: AvisoDePrivacidadeComponent;
  let fixture: ComponentFixture<AvisoDePrivacidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoDePrivacidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoDePrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

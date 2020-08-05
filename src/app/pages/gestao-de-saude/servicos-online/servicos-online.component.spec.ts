import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosOnlineComponent } from './servicos-online.component';

describe('ServicosOnlineComponent', () => {
  let component: ServicosOnlineComponent;
  let fixture: ComponentFixture<ServicosOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

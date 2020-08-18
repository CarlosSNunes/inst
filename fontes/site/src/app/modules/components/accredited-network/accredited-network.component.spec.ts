import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditedNetworkComponent } from './accredited-network.component';

describe('AccreditedNetworkComponent', () => {
  let component: AccreditedNetworkComponent;
  let fixture: ComponentFixture<AccreditedNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditedNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditedNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

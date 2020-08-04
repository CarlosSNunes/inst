import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansInfosComponent } from './plans-infos.component';

describe('PlansInfosComponent', () => {
  let component: PlansInfosComponent;
  let fixture: ComponentFixture<PlansInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

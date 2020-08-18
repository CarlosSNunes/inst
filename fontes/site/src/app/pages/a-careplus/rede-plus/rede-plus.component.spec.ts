import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedePlusComponent } from './rede-plus.component';

describe('RedePlusComponent', () => {
  let component: RedePlusComponent;
  let fixture: ComponentFixture<RedePlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedePlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

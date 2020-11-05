import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdssComponent } from './idss.component';

describe('IdssComponent', () => {
  let component: IdssComponent;
  let fixture: ComponentFixture<IdssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

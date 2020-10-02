import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostReadComponent } from './most-read.component';

describe('MostReadComponent', () => {
  let component: MostReadComponent;
  let fixture: ComponentFixture<MostReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAboutComponent } from './more-about.component';

describe('MoreAboutComponent', () => {
  let component: MoreAboutComponent;
  let fixture: ComponentFixture<MoreAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

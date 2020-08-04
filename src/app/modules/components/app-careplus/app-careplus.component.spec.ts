import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCareplusComponent } from './app-careplus.component';

describe('AppCareplusComponent', () => {
  let component: AppCareplusComponent;
  let fixture: ComponentFixture<AppCareplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCareplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCareplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

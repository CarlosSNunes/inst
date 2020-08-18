import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossContentSectionComponent } from './cross-content-section.component';

describe('CrossContentSectionComponent', () => {
  let component: CrossContentSectionComponent;
  let fixture: ComponentFixture<CrossContentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossContentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossContentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

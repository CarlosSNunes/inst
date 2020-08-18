import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCardsSectionComponent } from './icon-cards-section.component';

describe('IconCardsSectionComponent', () => {
  let component: IconCardsSectionComponent;
  let fixture: ComponentFixture<IconCardsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCardsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCardsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

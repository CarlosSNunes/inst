import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSectionComponent } from './cards-section.component';

describe('CardsSectionComponent', () => {
  let component: CardsSectionComponent;
  let fixture: ComponentFixture<CardsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

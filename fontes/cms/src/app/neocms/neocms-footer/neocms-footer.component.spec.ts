import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeocmsFooterComponent } from './neocms-footer.component';

describe('FooterComponent', () => {
  let component: NeocmsFooterComponent;
  let fixture: ComponentFixture<NeocmsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeocmsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeocmsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

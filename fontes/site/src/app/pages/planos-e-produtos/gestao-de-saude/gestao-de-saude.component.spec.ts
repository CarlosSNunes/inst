import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoDeSaudeComponent } from './gestao-de-saude.component';

describe('GestaoDeSaudeComponent', () => {
  let component: GestaoDeSaudeComponent;
  let fixture: ComponentFixture<GestaoDeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoDeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoDeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeocmsComponent } from './neocms.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NeocmsComponent', () => {
  let component: NeocmsComponent;
  let fixture: ComponentFixture<NeocmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NeocmsComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeocmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

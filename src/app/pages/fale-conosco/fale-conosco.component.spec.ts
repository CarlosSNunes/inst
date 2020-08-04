import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaleConoscoComponent } from './fale-conosco.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FaleConoscoComponent', () => {
  let component: FaleConoscoComponent;
  let fixture: ComponentFixture<FaleConoscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FaleConoscoComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaleConoscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

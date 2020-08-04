import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSomosComponent } from './quem-somos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('QuemSomosComponent', () => {
  let component: QuemSomosComponent;
  let fixture: ComponentFixture<QuemSomosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuemSomosComponent
      ],
      imports: [
        FontAwesomeModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuemSomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

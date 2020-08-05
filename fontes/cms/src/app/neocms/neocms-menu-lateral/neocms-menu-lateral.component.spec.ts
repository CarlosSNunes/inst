import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeocmsMenuLateralComponent } from './neocms-menu-lateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

describe('NeocmsMenuLateralComponent', () => {
  let component: NeocmsMenuLateralComponent;
  let fixture: ComponentFixture<NeocmsMenuLateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NeocmsMenuLateralComponent
      ],
      imports: [
        FontAwesomeModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeocmsMenuLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

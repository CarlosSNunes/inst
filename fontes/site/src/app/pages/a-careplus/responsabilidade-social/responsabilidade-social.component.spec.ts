import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilidadeSocialComponent } from './responsabilidade-social.component';

describe('ResponsabilidadeSocialComponent', () => {
  let component: ResponsabilidadeSocialComponent;
  let fixture: ComponentFixture<ResponsabilidadeSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsabilidadeSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsabilidadeSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

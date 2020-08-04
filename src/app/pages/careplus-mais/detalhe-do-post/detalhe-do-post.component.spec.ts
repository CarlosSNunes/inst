import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDoPostComponent } from './detalhe-do-post.component';

describe('DetalheDoPostComponent', () => {
  let component: DetalheDoPostComponent;
  let fixture: ComponentFixture<DetalheDoPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheDoPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

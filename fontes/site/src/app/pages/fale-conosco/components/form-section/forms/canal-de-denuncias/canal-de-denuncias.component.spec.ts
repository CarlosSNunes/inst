import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalDeDenunciasComponent } from './canal-de-denuncias.component';

describe('CanalDeDenunciasComponent', () => {
  let component: CanalDeDenunciasComponent;
  let fixture: ComponentFixture<CanalDeDenunciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanalDeDenunciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalDeDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

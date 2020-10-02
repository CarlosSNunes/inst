import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTheTeamComponent } from './join-the-team.component';

describe('JoinTheTeamComponent', () => {
  let component: JoinTheTeamComponent;
  let fixture: ComponentFixture<JoinTheTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinTheTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTheTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

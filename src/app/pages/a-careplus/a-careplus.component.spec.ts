import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACareplusComponent } from './a-careplus.component';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';

describe('ACareplusComponent', () => {
  let component: ACareplusComponent;
  let fixture: ComponentFixture<ACareplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ACareplusComponent
      ],
      imports: [
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACareplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

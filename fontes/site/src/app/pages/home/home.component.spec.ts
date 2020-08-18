import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { WindowRef } from 'src/utils/window-ref';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let windowRef: WindowRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      imports: [
        HttpClientTestingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        ReactiveFormsModule
      ],
      providers: [
        WindowRef
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    windowRef = TestBed.get(WindowRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('onScroll true', () => {
    const evt = {
      currentTarget: {
        pageYOffset: 99999
      }
    };
    component.onScroll(evt);

    expect(component.showBtnToTop).toBe(true);
  });

  it('onScroll false', () => {
    const evt = {
      currentTarget: {
        pageYOffset: 100
      }
    };
    component.onScroll(evt);

    expect(component.showBtnToTop).toBe(false);
  });

});

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WindowRef } from 'src/utils/window-ref';
import { HeaderComponent } from 'src/app/modules/header/header.component';
import { FooterComponent } from 'src/app/modules/footer/footer.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        WindowRef
      ]
    }).compileComponents();
  }));

  it('should create the app', (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    // spyOn(appService, 'rotaEvent').and.returnValue(new EventEmitter());
    fixture.detectChanges();
    expect(app).toBeTruthy();
    done();
  });

  it('ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    return;
  });
});

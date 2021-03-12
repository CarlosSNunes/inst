import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerDeleteComponent } from './banner-delete/banner-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BannerModel } from 'src/models/banner/banner.model';
import { of, throwError } from 'rxjs';
import { BannerService } from './banner.service';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let bannerService: BannerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerComponent,
        BannerDeleteComponent
      ],
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    bannerService = TestBed.get(BannerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openBannerDelete', () => {
    component.openBannerDelete(new BannerModel({}));
    expect(component.showBannerDelete).toEqual(true);
  });

  it('getBanners success', (done: DoneFn) => {
    const banners = new BannerModel({
      id: 1,
      titulo: 'titulo',
      dataCadastro: new Date(),
    });

    spyOn(bannerService, 'getAll').and.returnValue(of([banners]));
    component.getBanners();
    fixture.detectChanges();
    expect(component.showBannerDelete).toEqual(false);
    done();
  });

  it('getBanners error', (done: DoneFn) => {
    const errorMessage = { status: 404 };
    const error = throwError(errorMessage);
    spyOn(bannerService, 'getAll').and.returnValue(error);
    component.getBanners();
    fixture.detectChanges();
    expect(component.showBannerDelete).toEqual(false);
    done();
  });
});

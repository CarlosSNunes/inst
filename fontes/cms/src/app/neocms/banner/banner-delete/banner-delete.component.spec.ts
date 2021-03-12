import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDeleteComponent } from './banner-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BannerService } from '../banner.service';
import { of, throwError } from 'rxjs';
import { BannerModel } from 'src/models/banner/banner.model';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

describe('BannerDeleteComponent', () => {
  let component: BannerDeleteComponent;
  let fixture: ComponentFixture<BannerDeleteComponent>;
  let bannerService: BannerService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerDeleteComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDeleteComponent);
    component = fixture.componentInstance;
    bannerService = TestBed.get(BannerService);
    component.banner = new BannerModel({
      id: 1,
      titulo: 'titulo',
      dataCadastro: new Date(),
    });
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeModal', () => {
    component.closeModal();
    return;
  });

  it('deleteBanner success', (done: DoneFn) => {
    spyOn(bannerService, 'delete').and.returnValue(of(null));
    component.deleteBanner();
    fixture.detectChanges();
    done();
    return;
  });
});

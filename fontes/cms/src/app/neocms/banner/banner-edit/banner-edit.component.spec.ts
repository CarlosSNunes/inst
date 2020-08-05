import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEditComponent } from './banner-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';
import { BannerService } from '../banner.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { BannerModel } from 'src/models/banner/banner.model';
import { BannerComponent } from '../banner.component';
import { BannerDeleteComponent } from '../banner-delete/banner-delete.component';

describe('BannerEditComponent', () => {
  let component: BannerEditComponent;
  let fixture: ComponentFixture<BannerEditComponent>;
  let bannerService: BannerService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerEditComponent,
        BannerComponent,
        BannerDeleteComponent
      ],
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{ path: 'neocms/banner', component: BannerComponent }]
        )
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerEditComponent);
    component = fixture.componentInstance;
    component.banner = new BannerModel({
      id: 1,
      titulo: 'titulo',
      dataCadastro: new Date(),
      linkExterno: '0'
    });
    bannerService = TestBed.get(BannerService);
    authenticateService = new AuthenticationService();
    authenticateService.state = new UserAuthenticateModel({ perfis: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getErrors', () => {
    const descricao = component.bannerForm.controls.titulo;
    const result = component.getErrors(descricao);
    expect(result).not.toBeNull();
  });

  it('getBanner linkExterno 0', () => {
    spyOn(bannerService, 'getById').and.returnValue(of(component.banner));
    component.getBanner();
    expect(component.banner).not.toBeNull();
  });

  it('getBanner linkExterno 1', () => {
    component.banner.linkExterno = '1';
    spyOn(bannerService, 'getById').and.returnValue(of(component.banner));
    component.getBanner();
    expect(component.banner).not.toBeNull();
  });

  it('updateFileName', () => {
    const arquivos = [{ name: 'arquivo.png' }];
    component.updateFileName(arquivos);
    expect(component.arquivoNome).toEqual('arquivo.png');
  });

  it('updateFileName empty', () => {
    component.createForm();
    component.usuario = new UserAuthenticateModel({ perfis: [] });
    const arquivos = [];
    component.updateFileName(arquivos);
    expect(component.arquivo).toBeNull();
  });

  it('changeLinkExterno', () => {
    const value = '0';
    const selected = true;
    component.changeLinkExterno(value, selected);
    expect(component.isLinkExternoSelected).toEqual(selected);
  });

  it('onSubmit', () => {
    component.onSubmit();
    expect(component.bannerForm.valid).toEqual(false);
  });

  it('onSubmit success', (done: DoneFn) => {
    spyOn(bannerService, 'put').and.returnValue(of(null));
    component.f.titulo.setValue('titulo');
    component.f.rota.setValue('rota');
    component.f.arquivo.setValue('arquivo.png');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.bannerForm.valid).toEqual(true);
    done();
  });
});

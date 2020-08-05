import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCreateComponent } from './banner-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerService } from '../banner.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { of } from 'rxjs/internal/observable/of';
import { UserAuthenticateModel } from 'src/models/user-authenticate.model';
import { throwError } from 'rxjs';

describe('BannerCreateComponent', () => {
  let component: BannerCreateComponent;
  let fixture: ComponentFixture<BannerCreateComponent>;
  let bannerService: BannerService;
  let authenticateService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BannerCreateComponent
      ],
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCreateComponent);
    component = fixture.componentInstance;
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

  it('updateFileName', () => {
    const arquivos = [{ name: 'arquivo.png' }];
    component.updateFileName(arquivos);
    expect(component.arquivoNome).toEqual('arquivo.png');
  });

  it('updateFileName empty', () => {
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
    spyOn(bannerService, 'post').and.returnValue(of(null));
    component.f.titulo.setValue('titulo');
    component.f.rota.setValue('rota');
    component.f.arquivo.setValue('arquivo.png');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.bannerForm.valid).toEqual(true);
    done();
  });
});

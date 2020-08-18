import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { BannerModel } from 'src/app/models';
import { BannerService } from 'src/app/services';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let bannerService: BannerService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BannerComponent
            ],
            imports: [
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

    it('getBanners', (done: DoneFn) => {
        const banners = new Promise<BannerModel[]>((resolve, reject) => resolve([
            new BannerModel({
                caminhoImagem: 'src',
                dataCadastro: new Date(),
                descricao: 'teste',
                id: 1,
                linkExterno: '0',
                nomeImagem: 'teste.jpg',
                rota: '/',
                subtitulo: 'testando',
                titulo: 'teste',
                usuarioId: 1
            })
        ]))
        spyOn(bannerService, 'getAll').and.returnValue(banners);
        component.getBanners();
        fixture.detectChanges();
        expect(component.banners).not.toBeNull();
        done();
    });
});

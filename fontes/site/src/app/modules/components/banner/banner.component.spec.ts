import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { BannerService } from 'src/app/services';
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
});

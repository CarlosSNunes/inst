import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input, Output, EventEmitter, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { BannerModel, BreadcrumbModel, FieldErrors } from 'src/app/models';
import { BannerService } from 'src/app/services';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ErrorHandler } from 'src/utils/error-handler';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    animations: [
        trigger('slider', [
            state('enterAnimation', style({
                left: '0',
            })),
            transition('* => enterAnimation', [
                animate('0.3s')
            ]),
            state('initialState', style({
                left: '100vw',
            })),
            state('default', style({
                left: '0',
            })),
            state('leaveAnimation', style({
                left: '-100vw',
            })),
            transition('* => leaveAnimation', [
                animate('0.3s')
            ]),
        ])
    ]
})
export class BannerComponent implements OnInit {
    @ViewChild('circlePercentage', { static: false }) circlePercentage: ElementRef<HTMLElement>;
    @Input() banners: BannerModel[] = [];
    @Input() area: string = '';
    @Input() breadcrumbs?: BreadcrumbModel[] = [];
    @Input() hasAnchor?: boolean = false;
    @Output() slideToNextElement: EventEmitter<void> = new EventEmitter<void>();
    private bannerPercentageSubscription: Subscription;
    time: number = 30000;
    selectedBanner = 0;
    percentage: number = 0;
    percentageStoped: number = 0;
    stopped: boolean = false;
    isBrowser: boolean = false;
    width: number = 1400;
    loading: boolean = false;
    static staticBanners: Array<{
        banners: BannerModel[],
        area: string
    }> = [];

    constructor(
        private bannerService: BannerService,
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private plataformId,
        private errorHandler: ErrorHandler,
        private meta: Meta
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;
    }

    async ngOnInit() {
        /*
            Somente irá pesquisar na api se o parâmetro area for passado
        */
        if (this.area) {
            await this.verifyBanners();
        } else {
            this.setImageTagsForSEO(`${environment.CDN_URL}/${this.banners[0].caminhoCompletoDesktop}`);
        }

        this.banners.forEach((banner, i) => {
            banner.slideAtual = true
            if (i != 0) {
                banner.slideAtual = false;
                banner.bannerState = 'initialState'
            } else {
                banner.bannerState = 'default';
            }
        });

        if (this.isBrowser) {
            this.banners[0].firstInteraction = true;
            this.cdRef.detectChanges();
            this.time = this.banners[0].tempoExibicao
            if (this.banners.length > 1) {
                this.startBannerPercentage(this.time / 100, this.time)
            }
        }
    }

    /*
        Verifica se os banners já foram requisitados antes, se já ele pega os que estão armazenados ma memória, caso não irá verificar na request.
    */
    private async verifyBanners() {
        const staticBanners = BannerComponent.staticBanners.find(stBanner => stBanner.area == this.area);
        if (staticBanners) {
            staticBanners.banners.forEach((banner, i) => {
                if (i == 0) {
                    banner.slideAtual = true;
                } else {
                    banner.slideAtual = false;
                }
            })
            this.banners = staticBanners.banners;
        }
        const apiBanners = await this.getBannersFromApi();
        /*
            Caso nenhum banner seja retornado da api ele não irá preencher os banners
        */
        if (apiBanners.length > 0) {
            this.banners = apiBanners;
            this.cdRef.detectChanges();
            this.setImageTagsForSEO(this.banners[0].caminhoCompletoDesktop);
            if (!staticBanners) {
                BannerComponent.staticBanners.push({
                    area: this.area,
                    banners: apiBanners
                });
            } else {
                const index = BannerComponent.staticBanners.findIndex(stBanner => stBanner.area == this.area);
                BannerComponent.staticBanners[index].banners = apiBanners;
            }
        } else {
            this.setImageTagsForSEO(`${environment.CDN_URL}/${this.banners[0].caminhoCompletoDesktop}`);
        }
    }

    async getBannersFromApi() {
        this.loading = true;
        try {
            let banners = await this.bannerService.getByArea(this.area);
            banners = banners.map((banner, i) => {
                if (i === 0) {
                    banner.slideAtual = true;
                }
                return new BannerModel(banner);
            });
            this.loading = false;
            return banners;
        } catch (error) {
            this.errorHandler.ShowError(error);
            this.loading = false;
            return [];
        }
    }

    startBannerPercentage(time: number, totalTime: number) {
        if (!this.loading) {
            this.bannerPercentageSubscription = interval(time).subscribe(() => {
                this.percentageStoped += 1
                this.percentage = ((time * this.percentageStoped) / totalTime) * 100
                this.svgPercentage(this.percentage)
                if (time * this.percentageStoped >= totalTime) {
                    this.changeBanner()
                }
            })
        }
    }

    stopBannerPercentage() {
        if (this.bannerPercentageSubscription && !this.loading) {
            this.bannerPercentageSubscription.unsubscribe();
            this.bannerPercentageSubscription.remove(this.bannerPercentageSubscription);
        }
    }

    toggleBannerPercentage() {
        if (!this.loading) {
            if (this.stopped) {
                this.stopped = false
                this.startBannerPercentage(this.time / 100, this.time)
            } else {
                this.stopped = true;
                this.bannerPercentageSubscription.unsubscribe();
            }
        }
    }

    changeBanner() {
        if (this.banners[0].firstInteraction) {
            this.banners[0].firstInteraction = false
        }
        this.percentageStoped = 0
        this.percentage = 0
        this.svgPercentage(0)
        if (this.selectedBanner < this.banners.length - 1) {
            this.setCurrentSlide(this.selectedBanner + 1)
        } else {
            this.setCurrentSlide(0)
        }
    }

    setCurrentSlide(i: number) {
        if (this.selectedBanner != i) {
            if (this.banners[0].firstInteraction) {
                this.banners[0].firstInteraction = false
            }
            this.stopped = false
            this.banners[this.selectedBanner].bannerState = 'leaveAnimation';
            this.selectedBanner = i
            this.banners[this.selectedBanner].bannerState = 'enterAnimation'
            this.percentageStoped = 0
            this.percentage = 0
            this.stopBannerPercentage()
            this.time = this.banners[i].tempoExibicao;
            this.startBannerPercentage(this.time / 100, this.time)
            this.banners = this.banners.map((banner, index) => {
                if (i != index) {
                    banner.slideAtual = false
                } else {
                    banner.slideAtual = true
                }
                return banner
            });
            this.cdRef.detectChanges();
        }
    }

    svgPercentage(val: number) {
        const r = parseFloat(this.circlePercentage.nativeElement.getAttribute('r'))
        const c = Math.PI * (r * 2);

        if (val < 0) { val = 0; }
        if (val > 100) { val = 100; }

        const pct = ((100 - val) / 100) * c;

        this.circlePercentage.nativeElement.setAttribute('stroke-dashoffset', pct.toString());
    }

    captureDoneEvent(event: AnimationEvent) {
        if (event.fromState == 'enterAnimation' && event.toState == 'leaveAnimation' || event.fromState == 'default' && event.toState == 'leaveAnimation') {
            const index = parseInt(event.element.getAttribute('index'));

            this.banners[index].bannerState = 'initialState';
        }
    }

    setImageTagsForSEO(url) {
        this.meta.updateTag({
            name: "twitter:image",
            content: `${url}?${new Date().getTime()}`,
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${url}`,
        });
    }

    ngOnDestroy() {
        if (this.isBrowser && this.banners.length > 1) {
            this.stopBannerPercentage()
        }
    }
}

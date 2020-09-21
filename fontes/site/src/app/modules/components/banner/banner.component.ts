import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Input, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { BannerModel, BreadcrumbModel } from 'src/app/models';
import { BannerService } from 'src/app/services';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
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

    constructor(
        private bannerService: BannerService,
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private plataformId
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.banners.forEach((banner, i) => {
                banner.slideAtual = true
                if (i != 0) banner.slideAtual = false
                return banner
            });
            this.banners[0].firstInteraction = true;
            this.cdRef.detectChanges();
            this.time = this.banners[0].tempo
            if (this.banners.length > 1) {
                this.startBannerPercentage(this.time / 100, this.time)
            }
        }
    }

    startBannerPercentage(time: number, totalTime: number) {
        this.bannerPercentageSubscription = interval(time).subscribe(() => {
            this.percentageStoped += 1
            this.percentage = ((time * this.percentageStoped) / totalTime) * 100
            this.svgPercentage(this.percentage)
            if (time * this.percentageStoped >= totalTime) {
                this.changeBanner()
            }
        })
    }

    stopBannerPercentage() {
        this.bannerPercentageSubscription.unsubscribe();
        this.bannerPercentageSubscription.remove(this.bannerPercentageSubscription);
    }

    toggleBannerPercentage() {
        if (this.stopped) {
            this.stopped = false
            this.startBannerPercentage(this.time / 100, this.time)
        } else {
            this.stopped = true;
            this.bannerPercentageSubscription.unsubscribe();
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

    async getBanners() {
        try {
            this.banners = await this.bannerService.getByArea(this.area)
        } catch (error) {
            console.log(error)
        }
    }

    setCurrentSlide(i: number) {
        if (this.selectedBanner != i) {
            if (this.banners[0].firstInteraction) {
                this.banners[0].firstInteraction = false
            }
            this.stopped = false
            this.selectedBanner = i
            this.percentageStoped = 0
            this.percentage = 0
            this.stopBannerPercentage()
            this.time = this.banners[i].tempo;
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

    ngOnDestroy() {
        if (this.isBrowser && this.banners.length > 1) {
            this.stopBannerPercentage()
        }
    }
}

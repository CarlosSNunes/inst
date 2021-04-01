import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, PLATFORM_ID, Inject, HostListener, Input } from '@angular/core';
import { BannerModel } from 'src/app/models';
import BannersJSON from './data/banners';
import { Subscription, interval, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HammerGestureConfig } from '@angular/platform-browser';
import { takeWhile } from 'rxjs/operators';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-plus-network',
    templateUrl: './plus-network.component.html',
    styleUrls: ['./plus-network.component.scss']
})
export class PlusNetworkComponent implements OnInit {
    @ViewChild('circlePercentage', { static: false }) circlePercentage: ElementRef<HTMLElement>;
    @ViewChild('bannerSection', { static: false }) bannerSection: ElementRef<HTMLElement>;
    banners: BannerModel[] = BannersJSON;
    private bannerPercentageSubscription: Subscription;
    selectedBanner = 0;
    percentage: number = 0;
    percentageStoped: number = 0;
    stopped: boolean = false;
    isBrowser: boolean = false;
    time: number = 30000;
    alive: boolean = true;
    result: string;
    hammer: any;
    width: number = 0;
    @Input() backgroundColorClass: string = 'white-background-color';
    mobileElement: HTMLElement;

    constructor(
        private cdRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.cdRef.detectChanges();
            this.banners.forEach((banner, i) => {
                banner.slideAtual = true
                if (i != 0) banner.slideAtual = false
                return banner
            });
            this.cdRef.detectChanges();
            this.time = this.banners[0].tempoExibicao
            this.startBannerPercentage(this.time / 100, this.time)

            const hammerConfig = new HammerGestureConfig()
            hammerConfig.options = {
                touchAction: 'pan-y'
            }
            this.hammer = hammerConfig.buildHammer(this.bannerSection.nativeElement)
            fromEvent(this.hammer, "swipe").pipe(
                takeWhile(() => this.alive))
                .subscribe((res: any) => {
                    if (res.deltaX) {
                        if (res.deltaX < 0) {
                            this.nextBanner()
                        } else {
                            this.previousBanner()
                        }
                    }
                });
        }
    }


    @HostListener('window: resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
        }
    }


    startBannerPercentage(time: number, totalTime: number) {
        this.bannerPercentageSubscription = interval(time).subscribe(() => {
            this.percentageStoped += 1
            this.percentage = ((time * this.percentageStoped) / totalTime) * 100
            this.svgPercentage(this.percentage)
            if (time * this.percentageStoped >= totalTime) {
                this.nextBanner()
            }
        })
    }

    stopBannerPercentage() {
        if (this.mobileElement) {
            this.mobileElement.style.background = '';
            this.mobileElement = undefined
        }
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
            this.bannerPercentageSubscription.remove(this.bannerPercentageSubscription);
        }
    }

    previousBanner() {
        this.percentageStoped = 0
        this.percentage = 0
        this.svgPercentage(0)
        if (this.selectedBanner > 0) {
            this.setCurrentSlide(this.selectedBanner - 1, 'left')
        } else {
            this.setCurrentSlide(this.banners.length - 1, 'left')
        }
    }

    nextBanner() {
        this.percentageStoped = 0
        this.percentage = 0
        this.svgPercentage(0)
        if (this.selectedBanner < this.banners.length - 1) {
            this.setCurrentSlide(this.selectedBanner + 1, 'right')
        } else {
            this.setCurrentSlide(0, 'right')
        }
    }

    setCurrentSlide(i: number, action: string) {
        if (this.selectedBanner != i) {
            this.stopped = false
            this.selectedBanner = i
            this.percentageStoped = 0
            this.percentage = 0
            this.stopBannerPercentage()
            this.time = this.banners[i].tempoExibicao;
            this.startBannerPercentage(this.time / 100, this.time)
            this.banners = this.banners.map((banner, index) => {
                if (i != index) {
                    banner.slideAtual = false
                    banner.action = ''
                } else {
                    banner.slideAtual = true
                    banner.action = action
                }
                return banner
            });
            this.cdRef.detectChanges();
        }
    }

    svgPercentage(val: number) {
        if (this.width > 1023) {
            const r = parseFloat(this.circlePercentage.nativeElement.getAttribute('r'))
            const c = Math.PI * (r * 2);

            if (val < 0) { val = 0; }
            if (val > 100) { val = 100; }

            const pct = ((100 - val) / 100) * c;

            this.circlePercentage.nativeElement.setAttribute('stroke-dashoffset', pct.toString());
        }

        if (this.width < 1024) {
            if (!this.mobileElement) this.mobileElement = this.elementRef.nativeElement.querySelector('.steps .step.active .mobile-border');
            let mobilePercentage: number;
            let s = 1;
            if (val <= 50) {
                mobilePercentage = (18 / 5) * val - 90
                s = 1
            } else {
                s = 0
                mobilePercentage = (18 / 5) * val - 270
            }
            if (this.mobileElement) {
                this.mobileElement.style.background = `linear-gradient(#FFF, #fff) padding-box, linear-gradient(${mobilePercentage}deg, #fff 50%, transparent 0) center/calc(${s} * 100%) border-box,linear-gradient(${mobilePercentage}deg,  #c9c9c9 50%, transparent 0) center/calc(100% - ${s} * 100%) border-box, linear-gradient( to right, #fff 50%,  #c9c9c9 0 ) border-box`;
            }
        }
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            this.stopBannerPercentage()
            this.hammer.destroy()
        }
    }
}

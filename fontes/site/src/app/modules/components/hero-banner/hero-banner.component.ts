import { Component, OnInit, PLATFORM_ID, Inject, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VgAPI } from 'videogular2/compiled/src/core/core';
import { Subscription } from 'rxjs';
import { HeroBannerModel } from 'src/app/models';

@Component({
    selector: 'app-hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit, AfterViewInit {
    @Input() heroBannerModel: HeroBannerModel = new HeroBannerModel();
    @Output() slideToNextElement: EventEmitter<void> = new EventEmitter<void>();
    isBrowser: boolean = false;
    @ViewChild('media', { static: false }) media: ElementRef<any>;
    fullScreen: boolean = true;
    vgApi: VgAPI;
    subscriptions: Subscription[] = [];
    played: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private plataformId
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.fullScreen = false;
        }
    }

    onPlayerReady(event: VgAPI) {
        if (this.isBrowser) {
            this.vgApi = event;
            this.vgApi.volume = 0;
            this.vgApi.play();

            const onChangeFullScreenSubscription = this.vgApi.fsAPI.onChangeFullscreen.subscribe(evt => {
                this.fullScreen = evt;
                if (!evt) {
                    this.vgApi.volume = 0;
                    (this.vgApi.getDefaultMedia().elem as HTMLVideoElement).muted = true;
                    setTimeout(() => {
                        if (this.vgApi.getDefaultMedia().state === 'paused' || (this.vgApi.getDefaultMedia().elem as HTMLVideoElement).paused) {

                            this.vgApi.getDefaultMedia().play();
                            (this.vgApi.getDefaultMedia().elem as HTMLVideoElement).play();
                        }
                    }, 1000)
                } else {
                    (this.vgApi.getDefaultMedia().elem as HTMLVideoElement).muted = false;
                }
            });

            const onVideoEndSubscription = this.vgApi.getDefaultMedia().subscriptions.ended.subscribe(() => {
                this.vgApi.play();
            });

            this.subscriptions.push(onChangeFullScreenSubscription)
            this.subscriptions.push(onVideoEndSubscription)
        }
    }

    openFullScreen() {
        if (this.vgApi) {
            this.vgApi.volume = 0.5;
            this.vgApi.currentTime = 0;
            this.vgApi.fsAPI.toggleFullscreen();
            this.vgApi.getDefaultMedia().play();
        }
    }


    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe())
    }

}

import { Component, OnInit, PLATFORM_ID, Inject, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VgAPI } from 'videogular2/compiled/src/core/core';
import { Subscription } from 'rxjs';
import { HeroBannerModel } from 'src/app/models';

@Component({
    selector: 'app-hero-banner',
    templateUrl: './hero-banner.component.html',
    styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit {
    @Input() heroBannerModel: HeroBannerModel = new HeroBannerModel();
    @Output() slideToNextElement: EventEmitter<void> = new EventEmitter<void>();
    isBrowser: boolean = false;
    @ViewChild('media', { static: false }) media: ElementRef<any>;
    fullScreen: boolean = false;
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

    onPlayerReady(event: VgAPI) {
        if (this.isBrowser) {
            this.vgApi = event;
            this.vgApi.volume = 0;
            this.vgApi.play();

            const onVideoEndSubscription = this.vgApi.getDefaultMedia().subscriptions.ended.subscribe(() => {
                this.vgApi.play();
            });

            this.subscriptions.push(onVideoEndSubscription)
        }
    }

    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe())
    }

}

import { Component, OnInit, PLATFORM_ID, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VgAPI } from 'videogular2/compiled/src/core/core';
import { Subscription } from 'rxjs';
import { VideoModel, BreadcrumbModel } from 'src/app/models';

@Component({
    selector: 'app-video-section',
    templateUrl: './video-section.component.html',
    styleUrls: ['./video-section.component.scss']
})
export class VideoSectionComponent implements OnInit {
    @Input() videoModel: VideoModel = new VideoModel(
        {
            url: 'assets/videos/video-teste.mp4',
            type: 'video/mp4'
        }
    )
    isBrowser: boolean = false;
    @ViewChild('media', { static: false }) media: ElementRef<any>;
    fullScreen: boolean = true;
    vgApi: VgAPI;
    subscriptions: Subscription[] = [];
    breadcrumbs: BreadcrumbModel[] = [
        {
            name: 'Home',
            link: '/home'
        },
        {
            name: 'A Care Plus',
            link: '/a-careplus',
            active: true
        }
    ]

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
                    if (this.vgApi.getDefaultMedia().state === 'paused') {
                        this.vgApi.getDefaultMedia().play();
                    }
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
            this.vgApi.play();
            this.vgApi.fsAPI.toggleFullscreen()
        }
    }

    ngOnDestroy() {
        this.subscriptions.map(sub => sub.unsubscribe())
    }

}

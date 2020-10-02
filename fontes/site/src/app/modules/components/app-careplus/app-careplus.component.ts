import { Component, OnInit, Input, ViewChild, HostListener, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-app-careplus',
    templateUrl: './app-careplus.component.html',
    styleUrls: ['./app-careplus.component.scss']
})
export class AppCareplusComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @ViewChild('video', { static: false }) video: ElementRef<HTMLVideoElement>;
    width: number = 1400;
    isBrowser: boolean = false;

    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) private platformId: Platform
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;
    }

    ngOnInit() {
    }

}

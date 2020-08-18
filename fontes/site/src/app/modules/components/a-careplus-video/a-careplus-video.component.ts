import { Component, OnInit, PLATFORM_ID, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { CareplusVideoModel } from 'src/app/models';

@Component({
    selector: 'app-a-careplus-video',
    templateUrl: './a-careplus-video.component.html',
    styleUrls: ['./a-careplus-video.component.scss']
})
export class ACareplusVideoComponent implements OnInit {
    @Input() backgroundColor: string = '#fff';
    @Input() videoModel: CareplusVideoModel = new CareplusVideoModel({
        embedSrc: 'https://www.youtube.com/embed/WVcRo6iWffM'
    })
    isBrowser: boolean = false;
    @ViewChild('sectionVideo', { static: false }) sectionVideo: ElementRef<HTMLElement>;

    constructor(
        @Inject(PLATFORM_ID) private plataformId,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.document.documentElement.style.setProperty('--banner-background', this.backgroundColor);
        }
    }

    onPlayerReady(event) {

    }

    get offsetTop(): number {
        return this.sectionVideo.nativeElement.offsetTop;
    }

}

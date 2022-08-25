import { Component, OnInit, PLATFORM_ID, Inject, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CareplusVideoModel } from 'src/app/models';

@Component({
    selector: 'app-a-careplus-video',
    templateUrl: './a-careplus-video.component.html',
    styleUrls: ['./a-careplus-video.component.scss']
})
export class ACareplusVideoComponent implements OnInit {
    @Input() backgroundColor: string = 'white';
    @Input() videoModel: CareplusVideoModel = new CareplusVideoModel({
        embedSrc: 'https://www.youtube.com/embed/WVcRo6iWffM'
    })
    isBrowser: boolean = false;
    @ViewChild('sectionVideo', { static: false }) sectionVideo: ElementRef<HTMLElement>;
    public mobileOrDesktop: any;
    constructor(
        @Inject(PLATFORM_ID) private plataformId,
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        if (window.innerWidth >= 1023) {
            this.mobileOrDesktop = 'btn btn-digital-cian secondary medium arrow-right is-hidden-touch'
        } else {
            this.mobileOrDesktop = 'btn btn-digital-cian tertiary arrow-right small is-hidden-desktop'
        }
    }

    onPlayerReady(event) {

    }

    get offsetTop(): number {
        return this.sectionVideo.nativeElement.offsetTop;
    }

}

import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SliderModel } from 'src/app/models';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-our-programs',
    templateUrl: './our-programs.component.html',
    styleUrls: ['./our-programs.component.scss']
})
export class OurProgramsComponent implements OnInit {
    @ViewChild('ourProgramsSection', { static: false }) ourProgramsSection: ElementRef<HTMLElement>;
    sliderModel = new SliderModel({
        type: 'video',
        cardSizes: {
            width: '593px',
            height: '333px',
            space: 16
        },
        images: [
            {
                image: 'assets/img/slider-video-image.jpg',
                thumbImage: 'assets/img/slider-video-image.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
            {
                image: 'assets/img/slider-video-image-2.jpg',
                thumbImage: 'assets/img/slider-video-image-2.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
            {
                image: 'assets/img/slider-video-image.jpg',
                thumbImage: 'assets/img/slider-video-image.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
            {
                image: 'assets/img/slider-video-image-2.jpg',
                thumbImage: 'assets/img/slider-video-image-2.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
            {
                image: 'assets/img/slider-video-image.jpg',
                thumbImage: 'assets/img/slider-video-image.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
        ]
    });
    isBrowser: boolean = false;
    width = 1400;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 768) {
                this.sliderModel.cardSizes.width = '280px';
            } else {
                this.sliderModel.cardSizes.width = '593px';
            }
        }
    }

    ngOnInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;
        if (this.width < 768) {
            this.sliderModel.cardSizes.width = '280px';
        } else {
            this.sliderModel.cardSizes.width = '593px';
        }
    }

    get offsetTop(): number {
        return this.ourProgramsSection.nativeElement.offsetTop;
    }

}

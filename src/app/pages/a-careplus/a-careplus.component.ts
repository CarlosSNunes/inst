import {
    Component,
    OnInit,
    Inject,
    PLATFORM_ID,
    HostListener,
    ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import Cards from './data/cards';
import { IconCardModel, SliderModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-careplus',
    templateUrl: './a-careplus.component.html',
    styleUrls: ['./a-careplus.component.scss']
}

) export class ACareplusComponent implements OnInit {
    isBrowser: boolean = false;
    width: number = 0;
    offset: number = 0;
    elements: Array<HTMLElement> = [];
    cards: IconCardModel[] = Cards;
    sliderModel = new SliderModel({
        type: 'image',
        cardSizes: {
            width: '280px',
            height: '364px',
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
                title: 'O cuidado está no coração de tudo o que fazemos.'
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
                title: 'O cuidado está no coração de tudo o que fazemos.'
            },
            {
                image: 'assets/img/slider-video-image.jpg',
                thumbImage: 'assets/img/slider-video-image.jpg',
                alt: 'alt of image',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
        ]
    });

    constructor(
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef,
        private elementRef: ElementRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.plataformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);
            } else {
                this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);
            }
        }
    }

    ngOnInit() { }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.populateElements();
        }
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;
        if (this.width < 1024) {
            this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);
        } else {
            this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);
        }
        this.populateElements()
    }

    @HostListener('window:scroll') onScroll() {
        const pageY = (this.windowRef.nativeWindow.scrollY - this.offset);
        this.animate(pageY)
    }

    populateElements() {
        this.elements.push(this.elementRef.nativeElement.querySelector('.our-numbers'));
        this.elements.push(this.elementRef.nativeElement.querySelector('.infos-cols'));
        this.elements.push(this.elementRef.nativeElement.querySelector('.bupa-logo'));
        this.elements.push(this.elementRef.nativeElement.querySelector('.about-bupa'));
        this.elements.push(this.elementRef.nativeElement.querySelector('.about-bupa-description'));
    }

    animate(pageY: number) {

        this.elements.map(element => {
            const elementPositions = element.getBoundingClientRect();
            const winPositions = element.ownerDocument.defaultView;
            const top = elementPositions.top + winPositions.pageYOffset;

            if (top <= pageY) {
                if (!element.classList.contains('animate')) {
                    element.classList.add('animate');
                }
            } else if (top > (this.windowRef.nativeWindow.scrollY + this.windowRef.nativeWindow.innerHeight)) {
                if (element.classList.contains('animate')) {
                    element.classList.remove('animate');
                }
            }
        })
    }

    setSEOInfos() {
        this.title.setTitle('A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Referência em planos de saúde, planos odontológicos e medicina ocupacional.'
        });
    }

}
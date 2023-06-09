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
import { IconCardModel, SliderModel, HeroBannerModel, VideoModel, BreadcrumbModel } from 'src/app/models';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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
    heroBannerModel: HeroBannerModel = new HeroBannerModel({
        video: new VideoModel(
            {
                url: 'assets/videos/5065_CARE PLUS 30 ANOS_RT_V01_ [v15]_v2.mp4',
                type: 'video/mp4'
            }
        ),
        bigTitle: '',
        subTitle: '',
        isFullScreen: true,
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/'
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
                link: '/a-careplus',
                active: true
            })
        ],
        hasAnchor: false
    });
    sliderModel = new SliderModel({
        type: 'image',
        cardSizes: {
            width: '280px',
            height: '364px',
            space: 16
        },
        hasBackgroundColorWhite: true,
        images: [
            {
                image: 'assets/img/banner-rh.jpg',
                thumbImage: 'assets/img/banner-rh.jpg',
                alt: 'Oferecendo à sua empresa escolha e flexibilidade.',
                title: 'Oferecendo à sua empresa escolha e flexibilidade.'
            },
            {
                image: 'assets/img/careplus-plus-post-image.jpg',
                thumbImage: 'assets/img/careplus-plus-post-image.jpg',
                alt: 'O cuidado está no coração de tudo o que fazemos.',
                title: 'O cuidado está no coração de tudo o que fazemos.'
            },
            {
                image: 'assets/img/sobre-a-bupa.jpg',
                thumbImage: 'assets/img/sobre-a-bupa.jpg',
                alt: 'Seu bem-estar é a nossa razão de ser.',
                title: 'Seu bem-estar é a nossa razão de ser.'
            }
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
            this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);

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
        this.offset = - (this.windowRef.nativeWindow.innerHeight * 0.9);
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

        this.elements.forEach(element => {
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
        this.title.setTitle('A Empresa | Sobre Nós | Care Plus ');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus cuida do bem mais precioso das pessoas, a vida. A responsabilidade é enorme, por isso priorizamos pilares como cuidado, dedicação e segurança.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'A Empresa | Sobre Nós | Care Plus ',
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/assets/img/banner-dog-a-careplus.jpg`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'A Care Plus cuida do bem mais precioso das pessoas, a vida. A responsabilidade é enorme, por isso priorizamos pilares como cuidado, dedicação e segurança.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/a-careplus`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'A Empresa | Sobre Nós | Care Plus ',
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/assets/img/banner-dog-a-careplus.jpg`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'A Care Plus cuida do bem mais precioso das pessoas, a vida. A responsabilidade é enorme, por isso priorizamos pilares como cuidado, dedicação e segurança.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/a-careplus`,
        });
    }

}

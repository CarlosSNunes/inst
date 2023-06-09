import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { BreadcrumbModel, CareplusVideoModel, InfoSectionModel, SimpleBannerModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Cards } from './data/mock';

@Component({
    selector: 'app-carreiras',
    templateUrl: './carreiras.component.html',

})
export class CarreirasComponent implements OnInit {
    @ViewChild('aboutPlusNetwork', { static: false }) aboutPlusNetwork: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Faça parte de um time apaixonado em cuidar de pessoas!',
        description: 'Nosso objetivo é acompanhar o colaborador em sua carreira e juntos criarmos uma história sólida, de muito aprendizado.',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'Carreiras',
                link: '/carreiras',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/new-banner-carreiras.png'
    };
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        htag: 'h3',
        bigTitle: 'Por que somos apaixonados pela Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8'
    });
    infoSections: InfoSectionModel[] = [
        new InfoSectionModel({
            smallTitle: 'nossos colaboradores',
            bigTitle: 'Veja como é trabalhar na Care Plus',
            description: 'Assista aos depoimentos dos nossos colaboradores e entenda mais do nosso mundo',
            subDescription: 'Fizemos esse vídeo com os nossos colaboradores para que mais pessoas conheçam este trabalho institucional, que garante cuidado, carinho e o melhor ambiente de trabalho para todos.',
            imageSrc: 'assets/img/section-our-colaborators.jpg',
            hasModal: true,
        })
    ];
    cards = Cards;
    constructor(
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta,
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToNextSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.aboutPlusNetwork.nativeElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        })
    }

    setSEOInfos() {
        this.title.setTitle('Carreiras | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Faça Parte de um time que gosta de sonhar grande! A Care Plus tem como objetivo de acompanhar sua carreira e criar um futuro junto com você.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
            'Carreiras | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Faça Parte de um time que gosta de sonhar grande! A Care Plus tem como objetivo de acompanhar sua carreira e criar um futuro junto com você.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/carreiras`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
            'Carreiras | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Faça Parte de um time que gosta de sonhar grande! A Care Plus tem como objetivo de acompanhar sua carreira e criar um futuro junto com você.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/carreiras`,
        });
    }

}

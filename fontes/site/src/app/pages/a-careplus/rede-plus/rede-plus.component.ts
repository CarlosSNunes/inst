import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CareplusVideoModel, InfoSectionModel, BreadcrumbModel, SimpleBannerModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import Cards from './data/cards';

@Component({
    selector: 'app-rede-plus',
    templateUrl: './rede-plus.component.html',
    styleUrls: ['./rede-plus.component.scss']
})
export class RedePlusComponent implements OnInit {
    @ViewChild('aboutCarePlus', { static: false }) aboutCarePlus: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Os melhores profissionais da área de saúde',
        description: 'A Rede Plus é uma rede exclusiva composta pelos melhores e mais capacitados profissionais de saúde do mercado',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'A Care Plus',
                link: '/a-careplus',
            }),
            new BreadcrumbModel({
                name: 'Rede Plus',
                link: '/a-careplus/rede-plus',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/new-banner-redeplus.png'
    };
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Assista nosso vídeo da Rede Plus e conheça este nosso diferencial de atendimento',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8',
        htag: 'h3'
    });
    accreditedSection = new InfoSectionModel({
        smallTitle: 'credenciado rede plus',
        bigTitle: 'Saiba mais sobre nossa rede credenciada',
        description: 'A Rede Plus é exclusiva para os nossos beneficiários.',
        subDescription: 'Contamos com os melhores profissionais, de diversas especialidades na área de saúde.',
        subDescriptions: [
            'Com o plano Master International o beneficiário consegue ser atendido pela Rede Plus internacional e vivenciar uma experiência única de saúde. Em território nacional nossa Rede Credenciada inclui um currículo vasto e extenso de profissionais altamente capacitados e conhecidos no mercado, visando oferecer o melhor para os nossos beneficiários. Utilize a Rede Plus e sinta a diferença. '
        ],
        imageSrc: 'assets/img/new-banner-redeplus.png',
        htag: 'h4'
    });
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
            top: this.aboutCarePlus.nativeElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        })
    }

    setSEOInfos() {
        this.title.setTitle('Rede Plus | Rede Credenciada Premium | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Rede Plus é a rede credenciada exclusiva e premium da Care Plus, composta pelos melhores profissionais e clínicas de saúde do mercado brasileiro na atualidade.'
        });
    }

}

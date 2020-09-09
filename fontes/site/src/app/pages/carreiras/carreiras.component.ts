import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { BreadcrumbModel, CareplusVideoModel, InfoSectionModel, SimpleBannerModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-carreiras',
    templateUrl: './carreiras.component.html',
    styleUrls: ['./carreiras.component.scss']
})
export class CarreirasComponent implements OnInit {
    @ViewChild('aboutPlusNetwork', { static: false }) aboutPlusNetwork: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Faça Parte de um time que gosta de sonhar grande!',
        description: 'A Care Plus tem o objetivo de acompanhar você para a sua carreira e criar esse futuro junto com você',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
            }),
            new BreadcrumbModel({
                name: 'Carreiras',
                link: '/carreiras',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/a-careplus-carreiras-banner.jpg'
    };
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Por que somos apaixonados pela Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8'
    });
    infoSections: InfoSectionModel[] = [
        new InfoSectionModel({
            smallTitle: 'nossos colaboradores',
            bigTitle: 'Veja como é trabalhar na Care Plus',
            description: 'Assista ao lado depoimentos dos nossos colaboradores e entenda mais do nosso mundo',
            subDescription: 'Fizemos esse vídeo com os nossos colaboradores para que mais pessoas conheçam o trabalho institucional da Care Plus garantindo cuidado, carinho e o melhor ambiente de trabalho para todos.',
            imageSrc: 'assets/img/section-our-colaborators.jpg',
            hasModal: true,
        })
    ]
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
        this.title.setTitle('Carreiras | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus tem o objetivo de acompanhar você para a sua carreira e criar esse futuro junto com você.'
        });
    }

}

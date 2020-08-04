import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CareplusVideoModel, InfoSectionModel, BreadcrumbModel, SimpleBannerModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-rede-plus',
    templateUrl: './rede-plus.component.html',
    styleUrls: ['./rede-plus.component.scss']
})
export class RedePlusComponent implements OnInit {
    @ViewChild('aboutCarePlus', { static: false }) aboutCarePlus: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Os melhores profissionais da área de saúde',
        description: 'A Rede Plus é a rede de médicos excluisiva Care Plus composto pelos melhores e mais capacitados profissionais de saúde do mercado',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
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
        image: 'assets/img/responsabilidade-social-banner.jpg'
    };
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Assista nosso vídeo da Rede Plus e conheça este nosso diferencial de atendimento',
        video: {
            link: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4'
        }
    });
    accreditedSection = new InfoSectionModel({
        smallTitle: 'credenciados rede plus',
        bigTitle: 'Conheça e entenda mais da nossa rede credenciada',
        description: 'A rede credenciada da Rede Plus é exclusiva da Care Plus para os nossos beneficiários.',
        subDescription: 'Contamos com os melhores cardiologistas, ortopedistas, proctologistas, neurologistas e etc. Atuamos em todas as áreas da medicina em território nacional e também internacional.',
        subDescriptions: [
            'Com o plano Master International o beneficiário consegue ser atendido pela Rede Plus internacional e vivenciar uma experiência única de saúde. Em território nacional nossa Rede Credenciada inclui um currículo vasto e extenso de profissionais altamente capacitados e conhecidos no mercado, visando oferecer o melhor para os nossos beneficiários. Utilize a Rede Plus e sinta a diferença. '
        ],
        imageSrc: 'assets/img/section-credenciadores-rede-plus-a-carepus.jpg',
    });
    constructor(
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta,
    ) { }

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
        this.title.setTitle('Rede Plus | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Rede Plus é a rede de médicos exclusiva Care Plus composto pelos melhores e mais capacitados profissionais de saúde do mercado.'
        });
    }

}

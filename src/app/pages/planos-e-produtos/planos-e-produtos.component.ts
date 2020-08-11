import { Component, OnInit, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { InfoSectionModel, ButtonModel, PlanCardModel, IconCardsSectionModel, IconCardModel, HeroBannerModel, VideoModel, BreadcrumbModel } from 'src/app/models';
import Cards from './data/cards';

@Component({
    selector: 'app-planos-e-produtos',
    templateUrl: './planos-e-produtos.component.html',
    styleUrls: ['./planos-e-produtos.component.scss']
})
export class PlanosEProdutosComponent implements OnInit {
    ocupationalSection = new InfoSectionModel({
        smallTitle: 'MEDICINA OCUPACIONAL',
        bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
        description: 'A Care Plus tem o melhor serviço de medicina ocupacional para a sua empresa',
        subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
        imageSrc: 'assets/img/occupational.jpg',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/produtos-e-planos-careplus/medicina-ocupacional'
        })
    });
    planCards: PlanCardModel[] = [
        new PlanCardModel({
            title: 'Soho',
            subTitle: 'Para 2 a 29 vidas',
            description: 'O SoHo é o plano para até 29 vidas, indicado para pequenas empresas, empresas que atuam com home office e operações mais enxutas.',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/produtos-e-planos-careplus/soho'
            }),
            image: 'assets/svg/plans-soho.svg',
            id: 'soho'
        }),
        new PlanCardModel({
            title: 'Clube Care Plus',
            subTitle: 'Para 30 a 200 vidas',
            description: 'O Clube Care Plus é o plano para empresas com até 200 vidas, indicado para empresas que estão crescendo e expandindo seu negócio',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/produtos-e-planos-careplus/clube-careplus'
            }),
            image: 'assets/svg/clube-careplus.svg',
            id: 'clubeCarePlus'
        }),
        new PlanCardModel({
            title: 'Empresarial',
            subTitle: 'Para mais de 200 vidas',
            description: 'O Empresarial é o plano totalmente customizável da Care Plus, indicado para grandes empresas com mais de 200 vidas.',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/produtos-e-planos-careplus/empresarial'
            }),
            image: 'assets/svg/empresarial.svg',
            id: 'empresarial'
        })
    ];
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
        subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
        button: new ButtonModel({
            text: 'CONHEÇA NOSSOS PROGRAMAS',
            routerLink: '/gestao-de-saude'
        }),
        cards: Cards,
        columnClass: 'is-3-desktop'
    });
    secondCard: IconCardModel = new IconCardModel({
        title: 'Solicite uma Cotação',
        type: 'icon',
        link: '#',
        linkTitle: 'Clique e solicite cotação',
        imagePath: 'assets/svg/calendar.svg'
    });
    heroBannerModel: HeroBannerModel = new HeroBannerModel({
        video: new VideoModel(
            {
                url: 'assets/videos/video-teste.mp4',
                type: 'video/mp4'
            }
        ),
        bigTitle: 'Aqui você conhece a gama de planos e produtos de saúde Care Plus',
        contentContainerMaxWidth: 862,
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home'
            }),
            new BreadcrumbModel({
                name: 'Planos e Produtos',
                link: '/produtos-e-planos-careplus',
                active: true
            })
        ]
    })
    constructor(
        private title: Title,
        private meta: Meta,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToSection(anchor: string) {
        const htmlElement = this.elementRef.nativeElement.querySelector<HTMLElement>(anchor);
        if (htmlElement) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: htmlElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: 'smooth'
            });
        } else {
            console.error(`No html element found with id "${anchor}"`)
        }
    }

    private setSEOInfos() {
        this.title.setTitle('Produtos e Planos | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        })
    }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { InfoSectionModel, ButtonModel, PlanCardModel, IconCardsSectionModel, IconCardModel, HeroBannerModel, VideoModel, BreadcrumbModel } from 'src/app/models';
import Cards from './data/cards';
import { SimuladoresService } from 'src/app/services';

@Component({
    selector: 'app-planos-e-produtos',
    templateUrl: './planos-e-produtos.component.html',
    styleUrls: ['./planos-e-produtos.component.scss']
})
export class PlanosEProdutosComponent implements OnInit {
    ocupationalSection = new InfoSectionModel({
        smallTitle: 'MEDICINA OCUPACIONAL',
        bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
        description: 'A Care Plus tem o melhor serviço de Medicina Ocupacional para a sua empresa',
        subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
        imageSrc: 'assets/img/occupational.jpg',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/planos-e-produtos/medicina-ocupacional'
        })
    });
    planCards: PlanCardModel[] = [
        new PlanCardModel({
            title: 'Care Plus Soho',
            subTitle: 'Para 2 a 29 vidas',
            description: 'O Care Plus SoHo apresenta planos para pequenas empresas, de 2 a 29 vidas e é indicado para aquelas que atuam em home office ou com operações mais enxutas.',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/planos-e-produtos/soho'
            }),
            image: 'assets/svg/plans-soho.svg',
            id: 'soho'
        }),
        new PlanCardModel({
            title: 'Clube Care Plus',
            subTitle: 'Para 30 a 200 vidas',
            description: 'O Clube Care Plus apresenta planos para empresas, de 30 a 200 vidas e é indicado para aquelas que estão em crescimento e expandindo seus negócios.',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/planos-e-produtos/clube-careplus'
            }),
            image: 'assets/svg/clube-careplus.svg',
            id: 'clubeCarePlus'
        }),
        new PlanCardModel({
            title: 'Care Plus Empresarial',
            subTitle: 'Para mais de 200 vidas',
            description: 'O Care Plus Empresarial apresenta planos totalmente customizáveis, para mais de 200 vidas e é indicado para grandes empresas.',
            button: new ButtonModel({
                text: 'SAIBA MAIS',
                routerLink: '/planos-e-produtos/empresarial'
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
        button: new ButtonModel({
            routerLink: '/fale-conosco',
            text: 'Clique e solicite cotação',
        }),
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
                link: '/planos-e-produtos',
                active: true
            })
        ]
    })
    constructor(
        private title: Title,
        private meta: Meta,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef,
        private simuladoresService: SimuladoresService
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

    openSimulator() {
        this.simuladoresService.open();
    }

}

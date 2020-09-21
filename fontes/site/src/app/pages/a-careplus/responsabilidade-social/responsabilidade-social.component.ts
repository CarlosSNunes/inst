import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { BreadcrumbModel, CareplusVideoModel, InfoSectionModel, SimpleBannerModel, IconCardModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-responsabilidade-social',
    templateUrl: './responsabilidade-social.component.html',
    styleUrls: ['./responsabilidade-social.component.scss']
})
export class ResponsabilidadeSocialComponent implements OnInit {
    @ViewChild('iniciativaSection', { static: false }) iniciativaSection: ElementRef<HTMLElement>;
    simpleBannerModel: SimpleBannerModel = {
        title: 'Saiba mais sobre nossos projetos sociais e ações sustentáveis.',
        description: 'Aqui você pode ver nossas ações para contribuir por um mundo melhor.',
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
                name: 'Responsabilidade Social',
                link: '/a-careplus/responsabilidade-social',
                active: true
            })
        ],
        hasAnchor: true,
        image: 'assets/img/banner-responsabilidade.jpg'
    };
    isBrowser: boolean = false;
    width: number = 0;
    offset: number = 0;
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Assista as nossas ações para criar um mundo melhor',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8'
    });
    infoSections: InfoSectionModel[] = [
        new InfoSectionModel({
            smallTitle: 'PROGRAMAS SOCIAIS E SUSTENTÁVEIS',
            bigTitle: 'Conheça algumas de nossas iniciativas sociais e sustentáveis',
            // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et mi, ullamcorper enim phasellus tortor.',
            // subDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo gravida quam scelerisque molestie vitae eget tempus gravida. Quis quis accumsan etiam enim. Aliquet amet in commodo lobortis et etiam neque enim, ac. Nisi, eros cursus senectus eget ullamcorper tellus etiam et id. ',
            imageSrc: 'assets/img/programas-sociais.png',
            reverse: false
        }),
        new InfoSectionModel({
            smallTitle: 'Multiplicadores de Sorriso',

            subDescription: 'Anualmente, proporcionamos serviços odontológicos a crianças carentes em nossas clínicas do Rio de Janeiro e São Paulo. Dezenas de crianças recebem no dia da ação um tratamento odontológico gratuito, kits de higienização bucal e dicas de nutrição, tudo com muita alegria e amor.',
            imageSrc: 'assets/img/multiplicadores-de-sorriso.png',
            reverse: true,
            alignCenter: true
        }),
        new InfoSectionModel({
            smallTitle: 'Instituto Devolver / Festival Miolo Mole / Hospital Pequeno Príncipe',
            subDescription: 'Ao longo dos últimos anos doamos mais de R$ 2,5 milhões para iniciativas em diversas ONGs, como o Instituto Devolver e Doutores da Alegria (Festival Miolo Mole), e entidades ligadas a área da saúde como Hospital Pequeno Príncipe, que trata crianças carentes com câncer, além de bolsas de estudos na Faculdade de Medicina do Hospital Albert Einstein.',
            imageSrc: 'assets/img/inst-devolver.png',
            reverse: false,
            alignCenter: true
        }),
        new InfoSectionModel({
            smallTitle: 'Diversidade e Aprendiz Legal',
            subDescription: 'Promovemos um ambiente de trabalho positivo que envolve uma cultura diversificada e inclusiva que capacita os colaboradores com ferramentas, treinamentos, informações, reconhecimentos e recompensas alinhadas às necessidades. Investimos, com consistência, neste ecossistema através do nosso programa de Diversidade e do nosso programa Aprendiz Legal, que atua e trabalha com jovens de diversas classes sociais.',
            imageSrc: 'assets/img/diversidade.png',
            reverse: true,
            alignCenter: true
        }),
        new InfoSectionModel({
            smallTitle: 'Green Day e Amazônia',
            subDescription: 'Nosso Green Day incentiva que não se utilize copos descartáveis plásticos durante um dia inteiro no ano dentro de nossa empresa. Para reduzirmos o consumo de papel, mais de 95% dos nossos contratos e documentos são emitidos no formato digital, com assinaturas eletrônicas. Além disto, mudamos nossa sede para o edifício Amazônia, o qual possui certificação LEED (Leadership in Energy and Environmental Design) a fim de contribuir com uma maior eficiência energética e ambiental.',
            imageSrc: 'assets/img/greenday_amazonia.png',
            reverse: false,
            alignCenter: true
        })
    ];
    cards: IconCardModel[] = [
        new IconCardModel({
            "type": "icon",
            "title": "Perguntas Frequentes",
            "description": "Um espaço para você esclarecer todas as suas dúvidas, serviços disponíveis, rede credenciada e muito mais.",
            "imagePath": "assets/svg/faq.svg",
            "backgroundColorClass": "white-background-color",
            "hasCollapse": false
        }),
        new IconCardModel({
            "type": "icon",
            "title": "Rede Plus",
            "description": "Saiba mais sobre a Rede Plus, uma rede de profissionais diferente de tudo que você já viu no mercado. Além de sua seleção ter critérios rigorosos que envolvem a formação acadêmica e estrutura de atendimento, esta rede proporciona uma experiência de atendimento excepcional.",
            "imagePath": "assets/svg/star-hand.svg",
            "backgroundColorClass": "white-background-color",
            "hasCollapse": false,
            button: new ButtonModel({
                text: 'Saiba mais',
                routerLink: '/a-careplus/rede-plus'
            })
        }),
        new IconCardModel({
            "type": "icon",
            "title": "Materiais",
            "description": "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
            "imagePath": "assets/svg/document.svg",
            "backgroundColorClass": "white-background-color",
            "hasCollapse": false
        })
    ];

    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) platformId: Platform,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOinfos();
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.offset = 72;
            } else {
                this.offset = 0;
            }
        }
    }

    ngOnInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
            if (this.width < 1024) {
                this.offset = 72;
            } else {
                this.offset = 0;
            }
        }
    }

    goToNextSection() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.iniciativaSection.nativeElement.offsetTop - this.offset),
            behavior: 'smooth'
        });
    }


    setSEOinfos() {
        this.title.setTitle('Responsabilidade Social | Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Aqui você pode conferir as ações de responsabilidade social da Care Plus para um mundo melhor.'
        });
    }

}

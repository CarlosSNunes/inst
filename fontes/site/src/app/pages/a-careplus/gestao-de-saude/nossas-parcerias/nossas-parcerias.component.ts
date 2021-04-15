import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel } from './data/nossas-parcerias-mock';
import { IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedSectionCards from './data/personalized-section-cards';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-nossas-parcerias',
    templateUrl: './nossas-parcerias.component.html',
    
})
export class NossasParceriasComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Conheça nossos programas e serviços',
        subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
        button: new ButtonModel({
            text: 'Veja todos os Programas de Saúde',
            routerLink: '/planos-e-produtos'
        }),
        cards: PersonalizedSectionCards,
        columnClass: 'is-4-desktop'
    });
    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    goToSection(anchor: string) {
        const elementToScroll = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        if (elementToScroll) {
            this.windowRef.nativeWindow.scrollTo({
                left: 0,
                top: elementToScroll.offsetTop - parseInt(localStorage.getItem('elementOffset')),
                behavior: "smooth"
            })
        }
    }

    private setSEOInfos() {
        this.title.setTitle('Nossas Parcerias | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Sempre buscando as melhores soluções, estabelecemos parcerias estratégicas com empresas de alimentação saudável e assessoria esportiva, oferecendo descontos exclusivos.'
        });

        
         /* 
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Nossas Parcerias | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });

    
            this.meta.updateTag({
                name: "og:description",
                content: 'Sempre buscando as melhores soluções, estabelecemos parcerias estratégicas com empresas de alimentação saudável e assessoria esportiva, oferecendo descontos exclusivos.'
            });
    
            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/nossas-parcerias`,
            });
            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/banner-nossas-parcerias.jpg`,
            });
    
            /* 
                Twitter meta tags
            */
    
            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Nossas Parcerias | Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus',
            });
    
            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });
    
            this.meta.updateTag({
                name: "twitter:description",
                content: 'Sempre buscando as melhores soluções, estabelecemos parcerias estratégicas com empresas de alimentação saudável e assessoria esportiva, oferecendo descontos exclusivos.'
            });
    
            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/nossas-parcerias`,
            });
            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/banner-nossas-parcerias.jpg`,
            });
    }

}

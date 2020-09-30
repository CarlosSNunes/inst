import { Component, OnInit } from '@angular/core';
import { simpleBannerModel, eSocialSection, unidadesSection, occupationalSection, secondCard, firstCard } from './data/medicina-ocupacional-mock';
import { Title, Meta } from '@angular/platform-browser';
import { IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedServicesCards from './data/personalized-services';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-medicina-ocupacional',
    templateUrl: './medicina-ocupacional.component.html',
    styleUrls: ['./medicina-ocupacional.component.scss']
})
export class MedicinaOcupacionalComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    eSocialSection = eSocialSection;
    unidadesSection = unidadesSection;
    occupationalSection = occupationalSection;
    firstCard = firstCard;
    secondCard = secondCard;
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'SERVIÇOS PERSONALIZADOS',
        bigTitle: 'Soluções personalizadas em Medicina Ocupacional para a sua empresa',
        subDescription: 'Conte com os melhores serviços de Medicina Ocupacional. Todos eles seguem à risca as Normas Regulamentadoras (NRs). Confira quais são:',
        button: new ButtonModel({
            text: 'Solicite uma Cotação',
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            queryParams: {
                medicinaOcupacional: true
            }
        }),
        cards: PersonalizedServicesCards,
        columnClass: 'is-4-desktop'
    });
    constructor(
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    setSEOInfos() {
        this.title.setTitle('Medicina Ocupacional | Produtos e Planos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Medicina Ocupacional | Produtos e Planos | Care Plus",
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/planos-e-produtos/medicina-ocupacional`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Medicina Ocupacional | Produtos e Planos | Care Plus",
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // TODO
        /*
            Quando o NEOCMS estiver pronto as imagens ficarão em outro server e possuirão um caminho absoluto.
        */
        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/${this.simpleBannerModel.image}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/planos-e-produtos/medicina-ocupacional`,
        });
    }

}

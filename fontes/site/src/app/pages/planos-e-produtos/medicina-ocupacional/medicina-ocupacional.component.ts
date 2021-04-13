import { Component, OnInit } from '@angular/core';
import { simpleBannerModel, eSocialSection, unidadesSection, occupationalSection, secondCard, firstCard, servicosPersonalizadosSectionModel } from './data/medicina-ocupacional-mock';
import { Title, Meta } from '@angular/platform-browser';
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
    iconCardsSectionModel = servicosPersonalizadosSectionModel;
    constructor(
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    setSEOInfos() {
        this.title.setTitle('Medicina do Trabalho, Ocupacional, e-Social e PCMSO | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus, maior operadora de saúde premium do Brasil, disponibiliza serviços de Medicina do Trabalho, Medicina Ocupacional, e-Social, PCMSO, PPRA e ASO. '
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Medicina do Trabalho, Ocupacional, e-Social e PCMSO | Care Plus",
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
            content: 'A Care Plus, maior operadora de saúde premium do Brasil, disponibiliza serviços de Medicina do Trabalho, Medicina Ocupacional, e-Social, PCMSO, PPRA e ASO. '
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
                "Medicina do Trabalho, Ocupacional, e-Social e PCMSO | Care Plus",
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
            content: 'A Care Plus, maior operadora de saúde premium do Brasil, disponibiliza serviços de Medicina do Trabalho, Medicina Ocupacional, e-Social, PCMSO, PPRA e ASO. '
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/planos-e-produtos/medicina-ocupacional`,
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { simpleBannerModel, eSocialSection, unidadesSection, occupationalSection, secondCard } from './data/medicina-ocupacional-mock';
import { Title, Meta } from '@angular/platform-browser';
import { IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedServicesCards from './data/personalized-services';

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
    secondCard = secondCard;
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'SERVIÇOS PERSONALIZADOS',
        bigTitle: 'Soluções personalizadas em Medicina Ocupacional para a sua empresa',
        subDescription: 'Conte com os melhores serviços de Medicina Ocupacional. Todos eles seguem à risca as Normas Regulamentadoras (NRs). Confira quais são:',
        button: new ButtonModel({
            text: 'SOLICITE UMA COTAÇÃO',
            routerLink: '/fale-conosco',
            queryParams: {
                planoMedicinal: true
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
        this.title.setTitle('Medicina Ocupacional | Produtos e Planos | Care Plus')
        this.meta.updateTag({
            name: 'description',
            content: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.'
        })
    }

}

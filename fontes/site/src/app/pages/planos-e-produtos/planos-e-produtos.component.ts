import { Component, OnInit, ElementRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { WindowRef } from 'src/utils/window-ref';
import { SimuladoresService } from 'src/app/services';
import { ocupationalSection, planCards, iconCardsSectionModel, secondCard, heroBannerModel } from './data/mock';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-planos-e-produtos',
    templateUrl: './planos-e-produtos.component.html',
    styleUrls: ['./planos-e-produtos.component.scss']
})
export class PlanosEProdutosComponent implements OnInit {
    ocupationalSection = ocupationalSection;
    planCards = planCards;
    iconCardsSectionModel = iconCardsSectionModel;
    secondCard = secondCard;
    heroBannerModel = heroBannerModel;
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
        this.title.setTitle('Produtos e Planos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        })

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Produtos e Planos | Care Plus",
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
            content: `${environment.SELF_URL}/assets/img/bloco-simulador-de-planos.jpg`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/planos-e-produtos`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Produtos e Planos | Care Plus",
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
            content: `${environment.SELF_URL}/assets/img/bloco-simulador-de-planos.jpg`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Faça uma simulação do perfil da sua empresa aqui no site da Care Plus e confira os produtos e planos que mais se adequam.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/planos-e-produtos`,
        });
    }

    openSimulator() {
        this.simuladoresService.open();
    }

}

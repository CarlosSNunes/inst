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
        this.title.setTitle('Planos e Produtos de Saúde e Odontológicos Premium | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus oferece planos de saúde e odontológicos premium para empresas a partir de 2 vidas, além de produtos como o Medicina Ocupacional e o Gestão de Saúde.'
        })

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Planos e Produtos de Saúde e Odontológicos Premium | Care Plus",
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/assets/img/bloco-simulador-de-planos.jpg`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'A Care Plus oferece planos de saúde e odontológicos premium para empresas a partir de 2 vidas, além de produtos como o Medicina Ocupacional e o Gestão de Saúde.'
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
                "Planos e Produtos de Saúde e Odontológicos Premium | Care Plus",
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/assets/img/bloco-simulador-de-planos.jpg`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'A Care Plus oferece planos de saúde e odontológicos premium para empresas a partir de 2 vidas, além de produtos como o Medicina Ocupacional e o Gestão de Saúde.'
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

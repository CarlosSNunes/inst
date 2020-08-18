import { Component, OnInit, ElementRef } from '@angular/core';
import { simpleBannerModel } from './data/nossas-parcerias-mock';
import { IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedSectionCards from './data/personalized-section-cards';
import { WindowRef } from 'src/utils/window-ref';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-nossas-parcerias',
    templateUrl: './nossas-parcerias.component.html',
    styleUrls: ['./nossas-parcerias.component.scss']
})
export class NossasParceriasComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Conheça nossos programas e serviços',
        subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
        button: new ButtonModel({
            text: 'VEJA TODO OS PROGRAMAS',
            routerLink: '/gestao-de-saude'
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
        this.title.setTitle('Nossas Parcerias | Gestão de Saúde | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Para você ter acesso a mais vantagens, a Care Plus estabelece parcerias com empresas de alimentação saudável e consultoria esportiva. Conheça!'
        });
    }

}

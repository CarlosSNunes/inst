import { Component, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { simpleBannerModel, consultaFacil, checkupDoViajante, monitoramentoDoCheckup, programaDePrevencao } from './data/personal-system-mocks';
import { IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedSectionCards from './data/personalized-section-cards';

@Component({
    selector: 'app-personal-system',
    templateUrl: './personal-system.component.html',
    styleUrls: ['./personal-system.component.scss']
})
export class PersonalSystemComponent implements OnInit {
    isBrowser: boolean = false;
    simpleBannerModel = simpleBannerModel;
    consultaFacilSection = consultaFacil;
    checkupDoViajanteSection = checkupDoViajante;
    monitoramentoDoCheckupSection = monitoramentoDoCheckup;
    programaDePrevencaoSection = programaDePrevencao;
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
        private windowRef: WindowRef,
        private elementRef: ElementRef<HTMLElement>,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    setSEOInfos() {
        this.title.setTitle('Personal System | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Saiba mais sobre o Personal System Care Plus.'
        });
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

}

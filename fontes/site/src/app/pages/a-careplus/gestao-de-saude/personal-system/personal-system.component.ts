import { Component, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { simpleBannerModel, gerenciamentoDeDoencasCronicas, gestaoDeSaudeSection } from './data/personal-system-mocks';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-personal-system',
    templateUrl: './personal-system.component.html',
    styleUrls: ['./personal-system.component.scss']
})
export class PersonalSystemComponent implements OnInit {
    isBrowser: boolean = false;
    simpleBannerModel = simpleBannerModel;
    gerenciamentoDeDoencasCronicas = gerenciamentoDeDoencasCronicas;
    iconCardsSectionModel = gestaoDeSaudeSection;
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
        this.title.setTitle('Personal System | Gestão de Saúde | Saúde e Dental | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus apresenta o Personal System, um programa especializado na promoção de saúde e prevenção de doenças cardiovasculares, atendendo em clínicas próprias, rede credenciada e diretamente nas empresas.'
        });


         /*
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Personal System | Gestão de Saúde | Saúde e Dental | Care Plus',
            });

            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });


            this.meta.updateTag({
                name: "og:description",
                content: 'A Care Plus apresenta o Personal System, um programa especializado na promoção de saúde e prevenção de doenças cardiovasculares, atendendo em clínicas próprias, rede credenciada e diretamente nas empresas.'
            });

            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/personal-system`,
            });
            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/personal-system.jpg`,
            });

            /*
                Twitter meta tags
            */

            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Personal System | Gestão de Saúde | Saúde e Dental | Care PlusPlus',
            });

            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });

            this.meta.updateTag({
                name: "twitter:description",
                content: 'A Care Plus apresenta o Personal System, um programa especializado na promoção de saúde e prevenção de doenças cardiovasculares, atendendo em clínicas próprias, rede credenciada e diretamente nas empresas.'
            });

            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/personal-system`,
            });
            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/personal-system.jpg`,
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

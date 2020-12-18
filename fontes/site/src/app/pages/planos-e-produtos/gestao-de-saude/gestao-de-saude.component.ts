import { Component, OnInit, ElementRef } from '@angular/core';
import { HeroBannerModel, InfoSectionModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { heroBannerModel, infoSections } from './data/mock';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-gestao-de-saude',
    templateUrl: './gestao-de-saude.component.html',

})
export class GestaoDeSaudeComponent implements OnInit {
    heroBannerModel: HeroBannerModel = heroBannerModel;
    infoSections: InfoSectionModel[] = infoSections;

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

    goToSection(selector: string) {
        const element = this.elementRef.nativeElement.querySelector<HTMLElement>(selector)
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth',
        })
    }

    private setSEOInfos() {
        this.title.setTitle('Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Gestão de Saúde conta com programas e serviços de saúde especiais feitos para você. Desde ações preventivas até descontos em empresas de alimentação saudável e consultoria esportiva.'
        });

        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                `Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus`
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:image",
            content: `${environment.SELF_URL}/${this.infoSections[0].imageSrc}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'A Gestão de Saúde conta com programas e serviços de saúde especiais feitos para você. Desde ações preventivas até descontos em empresas de alimentação saudável e consultoria esportiva.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                `Gestão de Saúde | Produtos de Saúde e Odontológicos | Care Plus`
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:image",
            content: `${environment.SELF_URL}/${this.infoSections[0].imageSrc}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'A Gestão de Saúde conta com programas e serviços de saúde especiais feitos para você. Desde ações preventivas até descontos em empresas de alimentação saudável e consultoria esportiva.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude`,
        });
    }

}

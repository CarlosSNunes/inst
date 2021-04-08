import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerModel, InfoSectionModel, ButtonModel, IconCardsSectionModel, BreadcrumbModel } from 'src/app/models';
import { differentialsMock } from "./data/differentials";
import { bannersMock } from './data/banners';
import { WindowRef } from 'src/utils/window-ref';
import { ProductComponent } from 'src/app/modules/components/product/product.component';
import Cards from './data/cards';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CanonicalService } from 'src/app/services';

@Component({
    selector: 'app-corretor',
    templateUrl: './corretor.component.html',
    styleUrls: ['./corretor.component.scss']
})
export class CorretorComponent implements OnInit {
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ProductComponent
    differentials = differentialsMock;
    banners: Array<BannerModel> = bannersMock;
    travelSection: InfoSectionModel = new InfoSectionModel({
        smallTitle: 'CARE PLUS TRAVEL',
        bigTitle: 'Vai viajar ao exterior? Conte com o Care Plus Travel',
        description: 'O Care Plus Travel tem cobertura internacional de até US$ 300.000,00',
        subDescription: 'Desbrave o mundo sem preocupação. A Care Plus garante segurança e saúde para você e sua família curtirem a viagem com tranquilidade. Entre em contato com o gestor do seu plano para contratar esse benefício.',
        imageSrc: 'assets/img/plane.jpg'
    });
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
        subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
        button: new ButtonModel({
            text: 'Conheça o Gestão de Saúde',
            routerLink: '/a-careplus/gestao-de-saude'
        }),
        cards: Cards,
        columnClass: 'is-3-desktop'
    });
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Sou Corretor',
            link: '/sou-corretor',
            active: true
        }),
    ];

    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title,
        private canonicalService: CanonicalService
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
        this.canonicalService.createCanonicalURL('/');
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.sectionProduct.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('Sou Corretor | Care Plus ');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Corretores parceiros. Desta forma, tudo fica fácil para você.'
        });

        /* 
           Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Sou Corretor | Care Plus ",
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // Observação, a meta tag og:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "og:description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Corretores parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/sou-corretor`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Sou Corretor | Care Plus ",
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // Observação, a meta tag twitter:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "twitter:description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Corretores parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/sou-corretor`,
        });
    }

}

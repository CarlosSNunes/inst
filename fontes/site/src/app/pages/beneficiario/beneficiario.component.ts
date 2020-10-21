import { Component, OnInit, ViewChild } from '@angular/core';
import { differentialsMock } from "./data/differentials";
import { bannersMock } from './data/banners';
import { InfoSectionModel, ButtonModel, IconCardsSectionModel, BreadcrumbModel } from 'src/app/models';
import { AccreditedNetworkComponent } from 'src/app/modules/components/accredited-network/accredited-network.component';
import { WindowRef } from 'src/utils/window-ref';
import Cards from './data/cards';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-beneficiario',
    templateUrl: './beneficiario.component.html',
    styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {
    @ViewChild('sectionAccreditedNetwork', { static: false }) sectionAccreditedNetwork: AccreditedNetworkComponent;
    differentials = differentialsMock;
    banners = bannersMock;
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
            routerLink: '/planos-e-produtos/gestao-de-saude'
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
            name: 'Sou Beneficiário',
            link: '/sou-beneficiario',
            active: true
        }),
    ];

    constructor(
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
    }

    ngOnInit() {
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem('elementOffset'));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: (this.sectionAccreditedNetwork.offsetTop - elementOffset),
            behavior: "smooth"
        })
    }

    setSEOInfos() {
        this.title.setTitle('Sou Beneficiário | Care Plus ');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Beneficiários. Desta forma, tudo fica fácil para você.'
        });

        /* 
           Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Sou Beneficiário | Care Plus ",
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
            content: `${environment.SELF_URL}/${this.banners[0].caminhoImagem}`,
        });

        this.meta.updateTag({
            name: "og:description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Beneficiários. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/sou-beneficiario`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Sou Beneficiário | Care Plus ",
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
            content: `${environment.SELF_URL}/${this.banners[0].caminhoImagem}`,
        });

        this.meta.updateTag({
            name: "twitter:description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Beneficiários. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/sou-beneficiario`,
        });
    }

}

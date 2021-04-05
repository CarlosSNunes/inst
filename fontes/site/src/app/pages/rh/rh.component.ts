import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import {
    BannerModel,
    InfoSectionModel,
    ButtonModel,
    IconCardsSectionModel,
    BreadcrumbModel,
} from "src/app/models";
import { differentialsMock } from "./data/differentials";
import { bannersMock } from "./data/banners";
import { InfoSectionComponent } from "src/app/modules/components/info-section/info-section.component";
import { WindowRef } from "src/utils/window-ref";
import Cards from "./data/cards";
import { Meta, Title } from "@angular/platform-browser";
import { SimuladoresService } from "src/app/services";
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-rh",
    templateUrl: "./rh.component.html",
    styleUrls: ["./rh.component.scss"],
})
export class RhComponent implements OnInit {
    @ViewChild("infoSection", { static: false })
    infoSection: InfoSectionComponent;
    differentials = differentialsMock;
    banners: Array<BannerModel> = bannersMock;
    ocupationalSection = new InfoSectionModel({
        smallTitle: "MEDICINA OCUPACIONAL",
        bigTitle: "Mais saúde e qualidade no ambiente de trabalho",
        description:
            "A Care Plus tem o melhor serviço de Medicina Ocupacional para a sua empresa",
        subDescription:
            "Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.",
        imageSrc: "assets/img/home-ocupacional.jpg",
        button: new ButtonModel({
            text: "Conheça o Medicina Ocupacional",
            link: "/planos-e-produtos/medicina-ocupacional",
        }),
    });
    simulationSection = new InfoSectionModel({
        smallTitle: "SIMULADOR DE PLANOS E PRODUTOS",
        bigTitle: "Descubra o plano certo para a sua empresa",
        description:
            "Use nosso simulador de Planos e Produtos e encontre a solução ideal para o seu negócio",
        subDescription:
            "Não perca tempo pesquisando e selecionando as opções compatíveis com a sua empresa. Siga o passo a passo do nosso simulador e receba uma proposta já adequada ao perfil da sua organização.",
        imageSrc: "assets/img/plano-rh.jpg",
        button: new ButtonModel({
            text: "Simular Planos e Produtos",
            action: () => this.simularesService.open(),
        }),
        htag: 'h2'
    });
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: "GESTÃO DE SAÚDE",
        bigTitle:
            "Programas e serviços exclusivos: a melhor experiência em saúde",
        subDescription:
            "Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.",
        button: new ButtonModel({
            text: "Conheça Nossos Programas",
            routerLink: "/planos-e-produtos/gestao-de-saude",
        }),
        cards: Cards,
        columnClass: "is-3-desktop",
    });
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: "Home",
            link: "/",
        }),
        new BreadcrumbModel({
            name: "Sou RH",
            link: "/sou-rh",
            active: true,
        }),
    ];
    scrollTop: number = 0;
    showBtnToTop: boolean = false;

    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title,
        private simularesService: SimuladoresService
    ) {
        this.setSEOInfos();
    }

    ngOnInit() { }

    @HostListener("window:scroll", ["$event"])
    onScroll(event) {
        this.scrollTop = event.currentTarget.pageYOffset;
        if (this.scrollTop > this.infoSection.offsetTop) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem("elementOffset"));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.infoSection.offsetTop - elementOffset,
            behavior: "smooth",
        });
    }

    setSEOInfos() {
        this.title.setTitle("Sou RH | Care Plus ");
        this.meta.updateTag({
            name: "description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos RHs parceiros. Desta forma, tudo fica fácil para você.",
        });

        /* 
           Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Sou RH | Care Plus ",
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
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos RHs parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/sou-rh`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Sou RH | Care Plus ",
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
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos RHs parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/sou-rh`,
        });
    }
}

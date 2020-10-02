import {
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { bannersMock } from "./data/banners";
import { differentialsMock } from "./data/differentials";
import {
    BannerModel,
    CareplusVideoModel,
    IconCardsSectionModel,
    ButtonModel,
    BreadcrumbModel,
} from "src/app/models";
import { WindowRef } from "src/utils/window-ref";
import { ACareplusVideoComponent } from "src/app/modules/components/a-careplus-video/a-careplus-video.component";
import Cards from "./data/cards";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-credenciado",
    templateUrl: "./credenciado.component.html",
    styleUrls: ["./credenciado.component.scss"],
})
export class CredenciadoComponent implements OnInit {
    differentials = differentialsMock;
    banners: Array<BannerModel> = bannersMock;
    @ViewChild("videoCareplus", { static: false })
    videoCareplus: ACareplusVideoComponent;
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: "A CARE PLUS",
        bigTitle: "A maior operadora de saúde premium com 27 anos de mercado",
        embedSrc: "https://www.youtube.com/embed/VkJDsgCRrTk",
        button: new ButtonModel({
            text: "Conheça a Care Plus",
            title: "Conheça a Care Plus",
            routerLink: "/a-careplus",
        }),
    });
    iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
        smallTitle: "GESTÃO DE SAÚDE",
        bigTitle:
            "Programas e serviços exclusivos: a melhor experiência em saúde",
        subDescription:
            "Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.",
        button: new ButtonModel({
            text: "Conheça o Gestão de Saúde",
            routerLink: "/planos-e-produtos/gestao-de-saude",
        }),
        cards: Cards,
        columnClass: "is-3-desktop",
    });
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: "Home",
            link: "/home",
        }),
        new BreadcrumbModel({
            name: "Sou Credenciado",
            link: "/home/credenciado",
            active: true,
        }),
    ];

    constructor(
        private windowRef: WindowRef,
        private meta: Meta,
        private title: Title
    ) {
        this.setSEOInfos();
    }

    ngOnInit() { }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem("elementOffset"));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.videoCareplus.offsetTop - elementOffset,
            behavior: "smooth",
        });
    }

    setSEOInfos() {
        this.title.setTitle("Sou Credenciado | Care Plus ");
        this.meta.updateTag({
            name: "description",
            content:
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Credenciados parceiros. Desta forma, tudo fica fácil para você.",
        });


        /* 
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Sou Credenciado | Care Plus ",
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
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Credenciados parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/home/credenciado`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Sou Credenciado | Care Plus ",
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
                "A Care Plus reuniu em um única página informações relevantes, organizadas e específicas para nossos Credenciados parceiros. Desta forma, tudo fica fácil para você.",
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/home/credenciado`,
        });
    }

}

import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    Inject,
    PLATFORM_ID
} from '@angular/core';
import { ProductComponent } from '../../modules/components/product/product.component';
import { differentialsMock } from "./data/differentials";
import { bannersMock } from './data/banners'
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { ocupationalSection, videoModel, iconCardsSectionModel } from './data/mock';
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    differentials = differentialsMock;
    banners = bannersMock;
    @ViewChild('sectionProduct', { static: false }) sectionProduct: ProductComponent;
    isBrowser: boolean = false;
    ocupationalSection = ocupationalSection;
    videoModel = videoModel;
    iconCardsSectionModel = iconCardsSectionModel;

    constructor(
        private cdRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private plataformId,
        private windowRef: WindowRef,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.plataformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.cdRef.detectChanges();
        }
    }

    slideToSection() {
        const elementOffset = parseInt(localStorage.getItem("elementOffset"));
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.sectionProduct.offsetTop - elementOffset,
            behavior: "smooth",
        });
    }

    setSEOInfos() {
        this.title.setTitle("Care Plus | Plano de Saúde e Dental Premium, Clínicas e Ocupacional");

        this.meta.updateTag({
            name: "description",
            content:
                "A Care Plus é uma operadora premium de saúde que oferece Plano de Saúde e Odontológico, Clínicas Odontológicas e Médicas, além de Medicina Ocupacional.",
        });

        /*
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                "Care Plus | Plano de Saúde e Dental Premium, Clínicas e Ocupacional",
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
                "A Care Plus é uma operadora premium de saúde que oferece Plano de Saúde e Odontológico, Clínicas Odontológicas e Médicas, além de Medicina Ocupacional.",
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/`,
        });

        /*
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                "Care Plus | Plano de Saúde e Dental Premium, Clínicas e Ocupacional",
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
                "A Care Plus é uma operadora premium de saúde que oferece Plano de Saúde e Odontológico, Clínicas Odontológicas e Médicas, além de Medicina Ocupacional.",
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/`,
        });
    }
}

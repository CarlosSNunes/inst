import { Component, OnInit, PLATFORM_ID, Inject, HostListener, ElementRef } from '@angular/core';
import { simpleBannerModel, medicalOrientationSection, nutriADistancia, sliderModel } from './data/mock-data';
import { iconCardsSectionModel } from './data/mock-data';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-servicos-online',
    templateUrl: './servicos-online.component.html',
    styleUrls: ['./servicos-online.component.scss']
})
export class ServicosOnlineComponent implements OnInit {
    simpleBannerModel = simpleBannerModel;
    medicalOrientationSection = medicalOrientationSection;
    nutriADistancia = nutriADistancia;
    iconCardsSectionModel = iconCardsSectionModel;
    sliderModel = sliderModel;
    isBrowser: boolean = false;
    width: number = 1400;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform,
        private title: Title,
        private meta: Meta,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef
    ) {
        this.setSEOInfos();
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 768) {
                this.sliderModel.cardSizes.width = '280px';
            } else {
                this.sliderModel.cardSizes.width = '593px';
            }
        }
    }

    ngOnInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;
        if (this.width < 768) {
            this.sliderModel.cardSizes.width = '280px';
        } else {
            this.sliderModel.cardSizes.width = '593px';
        }
    }

    goToSection(anchor: string) {
        const element = this.elementRef.nativeElement.querySelector(anchor) as HTMLElement;
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: element.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        })
    }

    private setSEOInfos() {
        this.title.setTitle('Serviços Online | Gestão de Saúde | Saúde e Dental | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'O mundo é digital, e a Care Plus também. Investimos em tecnologia, disponibilizando serviços online, para que os nossos beneficiários, empresas e parceiros tenham toda a facilidade e comodidade que merecem.'
        });


         /*
            Open graph meta tags
        */
            this.meta.updateTag({
                name: "og:title",
                content:
                    'Serviços Online | Gestão de Saúde | Saúde e Dental | Care Plus',
            });

            this.meta.updateTag({
                name: "og:type",
                content:
                    "website",
            });


            this.meta.updateTag({
                name: "og:description",
                content: 'O mundo é digital, e a Care Plus também. Investimos em tecnologia, disponibilizando serviços online, para que os nossos beneficiários, empresas e parceiros tenham toda a facilidade e comodidade que merecem.'
            });

            this.meta.updateTag({
                name: "og:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/servicos-online`,
            });
            this.meta.updateTag({
                name: "og:image",
                content:`${environment.SELF_URL}/assets/img/servicos-online.jpg`,
            });

            /*
                Twitter meta tags
            */

            this.meta.updateTag({
                name: "twitter:title",
                content:
                    'Serviços Online | Gestão de Saúde | Saúde e Dental | Care Plus',
            });

            this.meta.updateTag({
                name: "twitter:card",
                content:
                    "summary_large_image",
            });

            this.meta.updateTag({
                name: "twitter:description",
                content: 'O mundo é digital, e a Care Plus também. Investimos em tecnologia, disponibilizando serviços online, para que os nossos beneficiários, empresas e parceiros tenham toda a facilidade e comodidade que merecem.'
            });

            this.meta.updateTag({
                name: "twitter:url",
                content: `${environment.SELF_URL}/planos-e-produtos/gestao-de-saude/servicos-online`,
            });
            this.meta.updateTag({
                name: "twitter:image",
                content:`${environment.SELF_URL}/assets/img/servicos-online.jpg`,
            });
    }

}

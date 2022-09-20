import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { bannersMock } from './data/banners';
import { BreadcrumbModel, CareplusVideoModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-diferenciais',
    templateUrl: './diferenciais.component.html',
    styleUrls: ['./diferenciais.component.scss']
})
export class DiferenciaisComponent implements OnInit {
    @ViewChild('sectionNossosPilares', { static: false }) sectionNossosPilares: ElementRef<HTMLElement>;
    banners = bannersMock;
    breadcrumbs: BreadcrumbModel[] = [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'A Care Plus',
            link: '/a-careplus'
        }),
        new BreadcrumbModel({
            name: 'Diferenciais',
            link: '/a-careplus/diferenciais',
            active: true
        })
    ];
    videoModel: CareplusVideoModel = new CareplusVideoModel({
        smallTitle: 'A CARE PLUS',
        bigTitle: 'Por que escolher a Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/VkJDsgCRrTk',
        button: new ButtonModel({
            text: 'Conheça a Care Plus',
            routerLink: '/a-careplus'
        }),
        htag: 'h3'
    });
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
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: this.sectionNossosPilares.nativeElement.offsetTop - parseInt(localStorage.getItem('elementOffset')),
            behavior: 'smooth'
        });
    }

    setSEOInfos() {
        this.title.setTitle('Diferenciais | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus sabe que atendimento, acolhimento e humanização fazem toda a diferença na vida de quem contrata, usa e comercializa os nossos planos e produtos de saúde.'
        });

        /*
            Open graph meta tags
        */
        this.meta.updateTag({
            name: "og:title",
            content:
                'Diferenciais | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        // Observação, a meta tag og:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "og:description",
            content: 'A Care Plus sabe que atendimento, acolhimento e humanização fazem toda a diferença na vida de quem contrata, usa e comercializa os nossos planos e produtos de saúde.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/a-careplus/diferenciais`,
        });

        /*
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content:
                'Diferenciais | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        // Observação, a meta tag twitter:image é preenchida no componente de banner.

        this.meta.updateTag({
            name: "twitter:description",
            content: 'A Care Plus sabe que atendimento, acolhimento e humanização fazem toda a diferença na vida de quem contrata, usa e comercializa os nossos planos e produtos de saúde.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/a-careplus/diferenciais`,
        });
    }

}

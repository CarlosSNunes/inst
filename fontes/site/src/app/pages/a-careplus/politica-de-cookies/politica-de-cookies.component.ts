import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-politica-de-cookies',
    templateUrl: './politica-de-cookies.component.html',
    styleUrls: ['./politica-de-cookies.component.scss']
})
export class PoliticaDeCookiesComponent implements OnInit {
    elements: ElementModel[] = [
        new ElementModel({
            name: 'Política de Cookies',
            id: 'politica-de-cookies'
        }),
        new ElementModel({
            name: 'O que são Cookies?',
            id: 'definicao'
        }),
        new ElementModel({
            name: 'Quais Cookies utilizamos?',
            id: 'quais-cookies-utilizamos'
        }),
        new ElementModel({
            name: 'Como gerenciar Cookies por meio do seu navegador',
            id: 'como-gerenciar-cookies'
        }),
        new ElementModel({
            name: 'Atualizações',
            id: 'atualizacoes-cookies'
        }),        
        new ElementModel({
            name: 'Contato',
            id: 'contato-cookies'
        })
    ];
    width: number = 1400;
    isBrowser: boolean = false;
    constructor(
        private windowRef: WindowRef,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private title: Title,
        private meta: Meta
    ) {
        this.setSEOinfos();
        this.isBrowser = isPlatformBrowser(this.platformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
        }
    }

    ngOnInit() {
    }

    setSEOinfos() {
        this.title.setTitle('Política de Cookies | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Política de Cookies | Care Plus.'
        });
        
        this.meta.updateTag({
            name: "og:title",
            content: 'Política de Cookies | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'Política de Cookies | Care Plus.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/a-careplus/politica-de-cookies`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content: 'Política de Cookies | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'Política de Cookies | Care Plus.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/a-careplus/politica-de-cookies`,
        });
    }

}
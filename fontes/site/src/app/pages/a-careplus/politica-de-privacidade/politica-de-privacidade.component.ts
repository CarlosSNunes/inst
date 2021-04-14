import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-politica-de-privacidade',
    templateUrl: './politica-de-privacidade.component.html',
    styleUrls: ['./politica-de-privacidade.component.scss']
})
export class PoliticaDePrivacidadeComponent implements OnInit {
    elements: ElementModel[] = [
        new ElementModel({
            name: 'Política de Privacidade',
            id: 'politica-de-privacidade'
        }),
        new ElementModel({
            name: 'Seus Direitos',
            id: 'seus-direitos'
        }),
        new ElementModel({
            name: 'Para que usamos suas informações pessoais',
            id: 'para-que-usamos'
        }),
        new ElementModel({
            name: 'Legítimo Interesse',
            id: 'legitimo-interesse'
        }),
        new ElementModel({
            name: 'Compartilhando suas informações',
            id: 'compartilhando-informacoes'
        }),
        new ElementModel({
            name: 'Por quanto tempo manteremos suas informações pessoais',
            id: 'porquanto-tempo-mantemos'
        }),
        new ElementModel({
            name: 'Mudanças ou Atualizações',
            id: 'mudancas-e-atualizacoes'
        }),
        new ElementModel({
            name: 'Sobre o Site e sobre a Care Plus',
            id: 'sobre-o-site'
        }),
        new ElementModel({
            name: 'Violações e Foro',
            id: 'violacoes-e-foro'
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
        this.title.setTitle('Política de Privacidade | Uso de Cookies | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus protegerá todas as informações recebidas e que possam identificar os seus clientes e visitantes, inclusive aquelas coletadas por qualquer outro meio que não o eletrônico, tais como cadastros preenchidos em papel ou telefônico.'
        });
        
        this.meta.updateTag({
            name: "og:title",
            content: 'Política de Privacidade | Uso de Cookies | Care Plus'
        });

        this.meta.updateTag({
            name: "og:type",
            content:
                "website",
        });

        this.meta.updateTag({
            name: "og:description",
            content: 'A Care Plus protegerá todas as informações recebidas e que possam identificar os seus clientes e visitantes, inclusive aquelas coletadas por qualquer outro meio que não o eletrônico, tais como cadastros preenchidos em papel ou telefônico.'
        });

        this.meta.updateTag({
            name: "og:url",
            content: `${environment.SELF_URL}/a-careplus/politica-de-privacidade`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content: 'Política de Privacidade | Uso de Cookies | Care Plus'
        });

        this.meta.updateTag({
            name: "twitter:card",
            content:
                "summary_large_image",
        });

        this.meta.updateTag({
            name: "twitter:description",
            content: 'A Care Plus protegerá todas as informações recebidas e que possam identificar os seus clientes e visitantes, inclusive aquelas coletadas por qualquer outro meio que não o eletrônico, tais como cadastros preenchidos em papel ou telefônico.'
        });

        this.meta.updateTag({
            name: "twitter:url",
            content: `${environment.SELF_URL}/a-careplus/politica-de-privacidade`,
        });
    }

}

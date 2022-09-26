import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-aviso-de-privacidade',
    templateUrl: './aviso-de-privacidade.component.html',
    styleUrls: ['./aviso-de-privacidade.component.scss']
})
export class AvisoDePrivacidadeComponent implements OnInit {
    elements: ElementModel[] = [
        new ElementModel({
            name: 'Aviso de Privacidade',
            id: 'aviso-de-privacidade'
        }),
        new ElementModel({
            name: 'Definições',
            id: 'definicoes'
        }),
        new ElementModel({
            name: 'Quais informações tratamos',
            id: 'quais-info-tratamos'
        }),
        new ElementModel({
            name: 'Como usamos seus dados pessoais',
            id: 'como-usamos-seus-dados'
        }),
        new ElementModel({
            name: 'Compartilhamento de seus dados pessoais',
            id: 'compartilhando-dados-pessoais'
        }),
        new ElementModel({
            name: 'Como mantemos seus dados pessoais seguros',
            id: 'como-mantemos'
        }),
        new ElementModel({
            name: 'Por quanto tempo ficamos com seus dados pessoais',
            id: 'por-quanto-tempo'
        }),
        new ElementModel({
            name: 'Seus direitos',
            id: 'seus-direitos'
        }),
        new ElementModel({
            name: 'Atualizações',
            id: 'atualizacoes'
        }),
        new ElementModel({
            name: 'Contato',
            id: 'contato'
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
        this.title.setTitle('Aviso de Privacidade | Uso de Cookies | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus protegerá todas as informações recebidas e que possam identificar os seus clientes e visitantes, inclusive aquelas coletadas por qualquer outro meio que não o eletrônico, tais como cadastros preenchidos em papel ou telefônico.'
        });
        
        this.meta.updateTag({
            name: "og:title",
            content: 'Aviso de Privacidade | Uso de Cookies | Care Plus'
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
            content: `${environment.SELF_URL}/a-careplus/aviso-de-privacidade`,
        });

        /* 
            Twitter meta tags
        */

        this.meta.updateTag({
            name: "twitter:title",
            content: 'Aviso de Privacidade | Uso de Cookies | Care Plus'
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
            content: `${environment.SELF_URL}/a-careplus/aviso-de-privacidade`,
        });
    }

}

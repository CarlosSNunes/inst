import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { Meta, Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from 'src/utils/window-ref';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-politica-de-privacidade',
    templateUrl: './politica-de-privacidade.component.html',
    styleUrls: ['./politica-de-privacidade.component.scss']
})
export class PoliticaDePrivacidadeComponent implements OnInit {
    elements: ElementModel[] = [
        new ElementModel({
            name: 'Política de Privacidade',
            id: 'politicaDePrivacidade'
        }),
        new ElementModel({
            name: 'Seus Direitos',
            id: 'seusDireitos'
        }),
        new ElementModel({
            name: 'Para que usamos suas informações pessoais',
            id: 'paraQueUsamos'
        }),
        new ElementModel({
            name: 'Legítimo Interesse',
            id: 'legitimoInteresse'
        }),
        new ElementModel({
            name: 'Compartilhando suas informações',
            id: 'compartilhandoInformacoes'
        }),
        new ElementModel({
            name: 'Por quanto tempo manteremos suas informações pessoais',
            id: 'porquantoTempoMantemos'
        }),
        new ElementModel({
            name: 'Mudanças ou Atualizações',
            id: 'mudancasEAtualizacoes'
        }),
        new ElementModel({
            name: 'Sobre o Site e sobre a Care Plus',
            id: 'sobreOSite'
        }),
        new ElementModel({
            name: 'Violações e Foro',
            id: 'violacoesEForo'
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
        this.title.setTitle('Política de Privacidade | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'A Care Plus protegerá todas as informações recebidas e que possam identificar os seus clientes e visitantes, inclusive aquelas coletadas por qualquer outro meio que não o eletrônico, tais como cadastros preenchidos em papel ou telefônico.'
        });
    }

}

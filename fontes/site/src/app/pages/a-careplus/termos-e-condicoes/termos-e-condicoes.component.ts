import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-termos-e-condicoes',
    templateUrl: './termos-e-condicoes.component.html',
    styleUrls: ['./termos-e-condicoes.component.scss']
})
export class TermosECondicoesComponent implements OnInit {
    elements: ElementModel[] = [
        new ElementModel({
            name: 'Termos de Uso',
            id: 'termos-de-uso-e-politica-de-privacidade'
        }),
        new ElementModel({
            name: 'Descrição do Serviço',
            id: 'descricao-do-servico'
        }),
        new ElementModel({
            name: 'Obrigações e Conduta do Usuário',
            id: 'obrigacoes-e-conduta-do-usuario'
        }),
        new ElementModel({
            name: 'Conta do Usuário, Identificação, Senha e Segurança',
            id: 'conta-do-usuario-identificacao-senha-e-seguranca'
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
        this.title.setTitle('Termos e Condições | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Confira os termos e condições gerais de uso e aquisição de planos e produtos relacionados ao site da Care Plus.'
        });
    }

}

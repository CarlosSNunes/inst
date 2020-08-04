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
            id: 'termosDeUsoEPoliticaDePrivacidade'
        }),
        new ElementModel({
            name: 'Descrição do Serviço',
            id: 'descricaoDoServico'
        }),
        new ElementModel({
            name: 'Obrigações e Conduta do Usuário',
            id: 'obrigacoesECondutaDoUsuario'
        }),
        new ElementModel({
            name: 'Conta do Usuário, Identificação, Senha e Segurança',
            id: 'contaDoUsuarioIdentificacaoSenhaESeguranca'
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
        this.title.setTitle('Termos e Condições | A Care Plus | Care Plus');
        this.meta.updateTag({
            name: 'description',
            content: 'Confira os termos e condições gerais de uso e compra de produtos e serviços do cliente do site Care Plus.'
        });
    }

}

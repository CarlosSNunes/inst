import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { IconCardModel, ButtonModel } from 'src/app/models';
import { SimuladoresService } from 'src/app/services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
    today: number = Date.now();
    siteMapOpened = false;
    atendimentoPresencialCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Atendimento presencial',
            link: '#',
        }),
        imagePath: 'assets/svg/maps-white.svg',
        backgroundColorClass: 'navy-background-color'
    });
    centralDeAtendimentoCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Central de Atendimento',
            link: 'tel:11 4197-9000'
        }),
        imagePath: 'assets/svg/phone-white.svg',
        backgroundColorClass: 'navy-background-color'
    });
    isBrowser: boolean = false;
    constructor(
        private simuladoresService: SimuladoresService,
        private renderer2: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.setDunButton();
            this.setSiteBlindadoButton();
            this.setTrustSignButton();
        }
    }

    setDunButton() {
        const script = this.document.createElement('script') as HTMLScriptElement;
        script.setAttribute('language', 'JavaScript');
        script.src = 'https://dunsregistered.dnb.com';
        script.type = 'text/javascript';
        this.document.body.appendChild(script);
    }

    setSiteBlindadoButton() {
        const script = this.document.createElement('script') as HTMLScriptElement;
        script.src = '//cdn.siteblindado.com/aw.js';
        script.type = 'text/javascript';
        this.document.body.appendChild(script);
    }

    setTrustSignButton() {
        const script = this.document.createElement('script') as HTMLScriptElement;
        script.src = '//s3-sa-east-1.amazonaws.com/selo.trustsign.com/ssltrust.js';
        script.type = 'text/javascript';
        this.document.body.appendChild(script);
    }

    openSimulator() {
        this.simuladoresService.open();
    }

}

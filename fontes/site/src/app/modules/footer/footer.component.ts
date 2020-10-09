import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IconCardModel, ButtonModel } from 'src/app/models';
import { SimuladoresService } from 'src/app/services';
import { WindowRef } from 'src/utils/window-ref';

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
    trustSignScript: HTMLScriptElement;
    siteBlindadoScript: HTMLScriptElement;
    dunAndBrandstreetScript: HTMLScriptElement;
    width: number = 1400;
    addedOnDesktop: boolean = true;
    addedOnMobile: boolean = false;

    constructor(
        private simuladoresService: SimuladoresService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.addedOnDesktop = false;
                this.addedOnMobile = true;
            }
        }
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

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
            this.renewScripts();
        }
    }

    private renewScripts() {
        if (this.width > 1023) {
            if (this.siteBlindadoScript && !this.addedOnDesktop) {
                this.siteBlindadoScript.remove()
                this.setSiteBlindadoButton();
            }

            if (this.trustSignScript && !this.addedOnDesktop) {
                this.trustSignScript.remove();
                this.setTrustSignButton();
            }

            if (this.dunAndBrandstreetScript && !this.addedOnDesktop) {
                this.dunAndBrandstreetScript.remove();
                this.setDunButton();
            }
            this.addedOnDesktop = true;
            this.addedOnMobile = false;
        } else if (this.width < 1024) {
            if (this.siteBlindadoScript && !this.addedOnMobile) {
                this.siteBlindadoScript.remove()
                this.setSiteBlindadoButton();
            }

            if (this.trustSignScript && !this.addedOnMobile) {
                this.trustSignScript.remove();
                this.setTrustSignButton();
            }

            if (this.dunAndBrandstreetScript && !this.addedOnMobile) {
                this.dunAndBrandstreetScript.remove();
                this.setDunButton();
            }
            this.addedOnDesktop = false;
            this.addedOnMobile = true;
        }
    }

    setDunButton() {
        // this.dunAndBrandstreetScript = this.document.createElement('script') as HTMLScriptElement;
        // this.dunAndBrandstreetScript.setAttribute('language', 'JavaScript');
        // this.dunAndBrandstreetScript.src = 'https://dunsregistered.dnb.com';
        // this.dunAndBrandstreetScript.type = 'text/javascript';

        // this.dunAndBrandstreetScript = this.document.createElement('script') as HTMLScriptElement;
        // this.dunAndBrandstreetScript.async = true;
        // this.dunAndBrandstreetScript.src = 'https://seal.godaddy.com/getSeal?sealID=bk4Lqe58bWynxrJ2iysC5AWayBzBtXRJoE90dFcCyxOyDGbNFBjXOO9uJBvR';
        // this.dunAndBrandstreetScript.type = 'text/javascript';

        // const element = this.elementRef.nativeElement.querySelector('#siteseal')

        // if (element) {
        //     element.appendChild(this.dunAndBrandstreetScript)
        // }
    }

    setSiteBlindadoButton() {
        this.siteBlindadoScript = this.document.createElement('script') as HTMLScriptElement;
        this.siteBlindadoScript.src = '//cdn.siteblindado.com/aw.js';
        this.siteBlindadoScript.type = 'text/javascript';
        this.document.body.appendChild(this.siteBlindadoScript);
    }

    setTrustSignButton() {
        this.trustSignScript = this.document.createElement('script') as HTMLScriptElement;
        this.trustSignScript.src = '//s3-sa-east-1.amazonaws.com/selo.trustsign.com/ssltrust.js';
        this.trustSignScript.type = 'text/javascript';
        this.document.body.appendChild(this.trustSignScript);
    }

    openSimulator() {
        this.simuladoresService.open();
    }

}

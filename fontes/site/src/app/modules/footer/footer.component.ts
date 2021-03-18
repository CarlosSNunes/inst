import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { IconCardModel, ButtonModel } from 'src/app/models';
import { EventEmitterService, SimuladoresService } from 'src/app/services';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
    actualYear: number = new Date().getFullYear();
    siteMapOpened = false;
    atendimentoPresencialCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Solicite uma Cotação',
            action: () => this.openSimulator(),
            target: '_self'
        }),
        imagePath: 'assets/svg/maps-white.svg',
        backgroundColorClass: 'navy-background-color'
    });
    centralDeAtendimentoCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Central de Atendimento',
            link: 'tel:11 4197-9000',
            target: '_self'
        }),
        imagePath: 'assets/svg/phone-white.svg',
        backgroundColorClass: 'navy-background-color'
    });
    isBrowser: boolean = false;
    goDaddyScript: HTMLScriptElement;
    siteBlindadoScript: HTMLScriptElement;
    dunAndBrandstreetScript: HTMLScriptElement;
    width: number = 1400;
    addedOnDesktop: boolean = true;
    addedOnMobile: boolean = false;
    openned: boolean = false;
    constructor(
        private simuladoresService: SimuladoresService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef,
        private elementRef: ElementRef<HTMLElement>,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
            if (this.width < 1024) {
                this.addedOnDesktop = false;
                this.addedOnMobile = true;
            }
        }
        EventEmitterService.get('closeSiteMap').subscribe(()=>{
            this.openned = false;
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.setSiteBlindadoButton();
            this.setGoDaddyButton();
            // TODO aguardando pessoal da Dun & Bradstreet
            // this.setDunAndBradstreet();
        } else {
            // TODO aguardando pessoal da Dun & Bradstreet
            // this.setDunAndBradstreet();
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

            if (this.goDaddyScript && !this.addedOnDesktop) {
                this.goDaddyScript.remove();
                this.setGoDaddyButton();
            }

            this.addedOnDesktop = true;
            this.addedOnMobile = false;
        } else if (this.width < 1024) {
            if (this.siteBlindadoScript && !this.addedOnMobile) {
                this.siteBlindadoScript.remove()
                this.setSiteBlindadoButton();
            }

            if (this.goDaddyScript && !this.addedOnMobile) {
                this.goDaddyScript.remove();
                this.setGoDaddyButton();
            }

            this.addedOnDesktop = false;
            this.addedOnMobile = true;
        }
    }

    setSiteBlindadoButton() {
        this.siteBlindadoScript = this.document.createElement('script') as HTMLScriptElement;
        this.siteBlindadoScript.src = '//cdn.siteblindado.com/aw.js';
        this.siteBlindadoScript.type = 'text/javascript';
        this.document.body.appendChild(this.siteBlindadoScript);
    }

    setDunAndBradstreet() {
        this.dunAndBrandstreetScript = this.document.createElement('script') as HTMLScriptElement;
        this.dunAndBrandstreetScript.src = 'https://dunsregistered.dnb.com';
        this.dunAndBrandstreetScript.type = 'text/javascript';
        const seloDun = this.elementRef.nativeElement.querySelector('#dun-and-brandstreet-button');
        seloDun.appendChild(this.dunAndBrandstreetScript);
    }

    setGoDaddyButton() {
        this.goDaddyScript = this.document.createElement('script') as HTMLScriptElement;
        this.goDaddyScript.async = true;
        this.goDaddyScript.src = 'https://seal.godaddy.com/getSeal?sealID=bk4Lqe58bWynxrJ2iysC5AWayBzBtXRJoE90dFcCyxOyDGbNFBjXOO9uJBvR';
        this.goDaddyScript.type = 'text/javascript';

        const element = this.elementRef.nativeElement.querySelector('#siteseal')

        if (element) {
            element.appendChild(this.goDaddyScript)
        }
    }



    openSimulator() {
        this.simuladoresService.open();
    }

   
}
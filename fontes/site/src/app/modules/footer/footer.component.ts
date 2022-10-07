import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
            link: 'tel:01141979000',
            target: '_self'
        }),
        imagePath: 'assets/svg/phone-white.svg',
        backgroundColorClass: 'navy-background-color'
    });
    isBrowser: boolean = false;
    goDaddyScript: HTMLScriptElement;
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

            EventEmitterService.get('closeSiteMap').subscribe(() => {
                this.openned = false;
            })
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.setGoDaddyButton();
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

            if (this.goDaddyScript && !this.addedOnDesktop) {
                this.goDaddyScript.remove();
                this.setGoDaddyButton();
            }

            this.addedOnDesktop = true;
            this.addedOnMobile = false;
        } else if (this.width < 1024) {

            if (this.goDaddyScript && !this.addedOnMobile) {
                this.goDaddyScript.remove();
                this.setGoDaddyButton();
            }

            this.addedOnDesktop = false;
            this.addedOnMobile = true;
        }
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

    openLink(link){
        window.open(link)
    }   

}
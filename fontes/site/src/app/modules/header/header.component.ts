import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SimuladoresService } from 'src/app/services';
import { Platform } from '@angular/cdk/platform';
import { SubMenu } from 'src/app/models';
import SubMenus from './data/menus';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    fontInitialValue: number = 16;
    minValue: number = 16;
    maxValue: number = 17;
    step: number = 0.5;
    isBrowser: boolean = false;
    subMenu: SubMenu = SubMenus[0];
    careplusUrl = environment.CAREPLUS_URL;
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private simuladoresService: SimuladoresService,
        private router: Router
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        const route = this.router.url;
        this.mountMenu(route);
        this.router.events.subscribe(evt => {
            if (evt instanceof NavigationEnd) {
                this.mountMenu(evt.url);
            }
        })
    }

    ngOnInit() {
        if (this.isBrowser) {
            const fontSize = localStorage.getItem('defaultfontsize');
            if (fontSize) {
                this.setFontSize(parseInt(fontSize));
            } else {
                localStorage.setItem('defaultfontsize', `${this.fontInitialValue}`);
            }
        }
    }

    mountMenu(url: string) {
        switch (url) {
            case '/sou-beneficiario':
                this.subMenu = SubMenus.find(sub => sub.id == 'beneficiario')
                break;

            case '/sou-rh':
                this.subMenu = SubMenus.find(sub => sub.id == 'rh')
                break;
            case '/sou-corretor':
                this.subMenu = SubMenus.find(sub => sub.id == 'corretor')
                break;
            case '/sou-credenciado':
                this.subMenu = SubMenus.find(sub => sub.id == 'credenciado')
                break;

            default:
                this.subMenu = SubMenus.find(sub => sub.id == 'default')
                break;
        }
    }

    changeFontSize(event: MatSliderChange) {
        this.setFontSize(event.value)
    }

    setFontSize(value: number) {
        this.fontInitialValue = value;
        this.document.documentElement.style.fontSize = `${value}px`;
        this.document.body.style.fontSize = `${value}px`;
        localStorage.setItem('defaultfontsize', `${value}`);
    }

    changeStep(subtract: boolean) {
        if (subtract && this.fontInitialValue > this.minValue) {
            this.fontInitialValue -= this.step;
            this.setFontSize(this.fontInitialValue)
        } else if (this.fontInitialValue < this.maxValue && subtract == false) {
            this.fontInitialValue += this.step;
            this.setFontSize(this.fontInitialValue)
        }
    }

    openSimulator() {
        this.simuladoresService.open();
    }
}

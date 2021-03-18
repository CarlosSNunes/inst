import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, Inject, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, Params } from '@angular/router';
import { RouteModel, SubMenu } from 'src/app/models';
import { routes } from 'src/utils/route-names';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ResizedEvent } from 'angular-resize-event';
import { WindowRef } from 'src/utils/window-ref';
import { DOCUMENT } from '@angular/common';
import { SimuladoresService, EventEmitterService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import SubMenus from './data/menus';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss'],
    animations: [
        trigger('layerAnimation', [
            // ...
            state('opened', style({
                transform: 'translateX(0%)'
            })),
            transition('closed => opened', [
                animate('0.3s')
            ]),
            state('closed', style({
                transform: 'translateX(100%)'
            })),
            transition('opened => closed', [
                animate('0.3s')
            ]),
        ]),
        trigger('containerAnimation', [
            // ...
            state('opened', style({
                transform: 'translateX(0%)'
            })),
            transition('closed => opened', [
                animate('0.3s')
            ]),
            state('closed', style({
                transform: 'translateX(100%)'
            })),
            transition('opened => closed', [
                animate('0.3s')
            ]),
        ]),
    ]
})
export class HeaderMobileComponent implements OnInit, AfterViewInit {
    selectedPage: string = '';
    routesToFind: RouteModel[] = routes;
    faAngleDown = faAngleDown;
    faTimes = faTimes;
    openedDropDown: boolean = false;
    @ViewChild('menu', { static: true }) menu: ElementRef<HTMLDivElement>
    @ViewChild('body', { static: true }) body: ElementRef<HTMLDivElement>
    @ViewChild('bottom', { static: true }) bottom: ElementRef<HTMLDivElement>
    checked: boolean = false;
    expandedAccordion: string;
    scrollPosition: number = 0;
    pageLoaded: boolean = false;
    static params: Params = {};
    actualRoute: string = '';
    careplusUrl = environment.CAREPLUS_URL;
    subMenu: SubMenu = SubMenus[0];
    layerAnimation: string = 'closed';
    containerAnimation: string = 'closed';
    lastRoute: string = '';


    constructor(
        private router: Router,
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document,
        private simuladoresService: SimuladoresService,
    ) {
        const initialRoute = this.routesToFind.find(r => this.router.url === r.route);
        if (initialRoute) {
            this.selectedPage = initialRoute.description;
        }

        const route = this.router.url;
        this.mountMenu(route);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let routeToCompare = event.urlAfterRedirects;
                if (routeToCompare.includes('?')) {
                    routeToCompare = routeToCompare.substring(0, routeToCompare.indexOf('?'))
                }
                if (routeToCompare.includes('#')) {
                    routeToCompare = routeToCompare.substring(0, routeToCompare.indexOf('#'))
                }

                this.mountMenu(event.url);

                this.actualRoute = routeToCompare;

                const route = this.routesToFind.find(r => {
                    delete HeaderMobileComponent.params.id
                    if (event.id && r.route instanceof Function) {
                        if (routeToCompare === r.route(event.id)) {
                            HeaderMobileComponent.params.id = event.id;
                        }
                        return routeToCompare === r.route(event.id);
                    } else {
                        return routeToCompare === r.route
                    }
                });
                if (route) {
                    this.selectedPage = route.description;
                }

                this.expandAccordion('');
            }
        });

        EventEmitterService.get<RouteModel>('custouRoute').subscribe(route => {
            this.selectedPage = route.description;
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.pageLoaded = true
    }

    @HostListener('window: resize') onResize() {
        this.positionFooterOnBottom()
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

    toggleDropDown(drop = undefined) {
        if (drop) {
            this.openedDropDown = drop;
        } else {
            this.openedDropDown = !this.openedDropDown;
        }
    }

    initTransition() {
        this.checked = !this.checked;
        if (this.checked) {
            this.menu.nativeElement.classList.add('open');
            this.layerAnimation = 'opened';
            const top = (this.windowRef.nativeWindow.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
            this.scrollPosition = top;
            this.document.body.classList.add('no-scroll');
            this.document.body.scrollTop = this.scrollPosition;
            this.lastRoute = this.actualRoute;
        } else {
            this.containerAnimation = 'closed';
        }
    }

    captureDoneEvent(event: AnimationEvent) {
        if (event.fromState == 'closed' && event.toState == 'opened' && event.triggerName == 'layerAnimation') {
            this.containerAnimation = 'opened'
        }

        if (event.fromState == 'opened' && event.toState == 'closed' && event.triggerName == 'containerAnimation') {
            this.layerAnimation = 'closed'
        }

        if (event.fromState == 'opened' && event.toState == 'closed' && event.triggerName == 'layerAnimation') {
            this.menu.nativeElement.classList.remove('open');
            this.document.body.classList.remove('no-scroll');
            if (this.lastRoute === this.actualRoute) {
                this.windowRef.nativeWindow.scrollTo(0, this.scrollPosition)
            } else {
                this.lastRoute = this.actualRoute;
            }
        }
    }

    positionFooterOnBottom(evt?: ResizedEvent) {
        let height = 0
        if (!evt) {
            this.bottom.nativeElement.style.width = '100%';
            this.bottom.nativeElement.style.position = 'unset';
            this.bottom.nativeElement.style.bottom = 'unset';
            height = this.body.nativeElement.scrollHeight;
        } else {
            height = evt.newHeight;
        }
        if (height <= (this.windowRef.nativeWindow.innerHeight - 126)) {
            this.bottom.nativeElement.style.width = 'calc(100% - 64px)';
            this.bottom.nativeElement.style.position = 'absolute';
            this.bottom.nativeElement.style.bottom = '15px';
        } else {
            this.bottom.nativeElement.style.width = '100%';
            this.bottom.nativeElement.style.position = 'unset';
            this.bottom.nativeElement.style.bottom = 'unset';
        }
    }

    expandAccordion(className: string) {
        if (this.expandedAccordion === className) {
            this.expandedAccordion = '';
        } else {
            this.expandedAccordion = className;
        }
    }

    openSimulator() {
        this.simuladoresService.open();
    }


}

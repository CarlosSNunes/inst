import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, Inject } from '@angular/core';
import { Router, NavigationEnd, Params } from '@angular/router';
import { RouteModel, SubMenu } from 'src/app/models';
import { routes } from 'src/utils/route-names';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ResizedEvent } from 'angular-resize-event';
import { WindowRef } from 'src/utils/window-ref';
import { DOCUMENT } from '@angular/common';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter-service.service';
import { SimuladoresService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import SubMenus from './data/menus';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit, AfterViewInit {
    selectedPage: string = '';
    routesToFind: RouteModel[] = routes;
    faAngleDown = faAngleDown;
    faTimes = faTimes;
    openedDropDown: boolean = false;
    @ViewChild('menu', { static: true }) menu: ElementRef<HTMLDivElement>
    @ViewChild('firstLayer', { static: true }) firstLayer: ElementRef<HTMLDivElement>
    @ViewChild('secondLayer', { static: true }) secondLayer: ElementRef<HTMLDivElement>
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

    constructor(
        private router: Router,
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document,
        private simuladoresService: SimuladoresService
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
        this.firstLayer.nativeElement.addEventListener("transitionend", this.transitionListener.bind(this))
        this.secondLayer.nativeElement.addEventListener("transitionend", this.transitionListener.bind(this))
    }

    ngAfterViewInit() {
        this.pageLoaded = true
    }

    @HostListener('window: resize') onResize() {
        this.positionFooterOnBottom()
    }

    mountMenu(url: string) {
        switch (url) {
            case '/home/beneficiario':
                this.subMenu = SubMenus.find(sub => sub.id == 'beneficiario')
                break;

            case '/home/rh':
                this.subMenu = SubMenus.find(sub => sub.id == 'rh')
                break;
            case '/home/corretor':
                this.subMenu = SubMenus.find(sub => sub.id == 'corretor')
                break;
            case '/home/credenciado':
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
            const top = (this.windowRef.nativeWindow.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0);
            this.scrollPosition = top;
            this.document.body.classList.add('no-scroll');
            this.document.body.scrollTop = this.scrollPosition;
        } else {
            this.document.body.classList.remove('no-scroll');
            this.windowRef.nativeWindow.scrollTo(0, this.scrollPosition)
        }
        if (this.menu.nativeElement.classList.contains('open')) {
            this.secondLayer.nativeElement.classList.remove('open');
        } else {
            this.menu.nativeElement.classList.add('open')
            this.firstLayer.nativeElement.classList.add('open');
        }
    }

    transitionListener(event) {
        if (
            event.target.classList.contains('layer') &&
            !this.secondLayer.nativeElement.classList.contains('open') &&
            this.menu.nativeElement.classList.contains('open') &&
            event.target.classList.contains('open')
        ) {
            this.secondLayer.nativeElement.classList.add('open')
            this.positionFooterOnBottom()
        } else if (
            event.target.classList.contains('container') &&
            this.firstLayer.nativeElement.classList.contains('open') &&
            !event.target.classList.contains('open')
        ) {
            this.firstLayer.nativeElement.classList.remove('open')
        } else if (
            event.target.classList.contains('layer') &&
            !this.secondLayer.nativeElement.classList.contains('open') &&
            !event.target.classList.contains('open') &&
            this.menu.nativeElement.classList.contains('open')
        ) {
            this.menu.nativeElement.classList.remove('open')
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

    ngOnDestroy() {
        this.firstLayer.nativeElement.removeEventListener("transitionend", (evt) => null)
        this.secondLayer.nativeElement.removeEventListener("transitionend", (evt) => null)
    }

}

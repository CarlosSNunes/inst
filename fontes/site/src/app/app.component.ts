import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, HostListener, AfterViewInit } from '@angular/core';
import { RouteModel } from 'src/app/models';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, Event, ActivatedRoute, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WindowRef } from 'src/utils/window-ref';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CanonicalService } from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('cookieAgreeAnimation', [
            state('agree', style({
                opacity: 0,
                display: 'none'
            })),
            state('not-agree', style({
                opacity: 1,
                display: 'block'
            })),
            transition('not-agree => agree', [
                animate('0.3s')
            ]),
            transition('agree => not-agree', [
                animate('0.3s')
            ]),
        ]),
    ]
})

export class AppComponent implements OnInit, AfterViewInit {
    routes: RouteModel[] = [];
    isBrowser: boolean = false;
    width: number = 1440;
    elementOffset: number = 0;
    initiated: boolean = false;
    scrollTop: number = 0;
    showBtnToTop: boolean = false;
    invertColors: boolean = false;
    footer: HTMLElement;
    cookieAgree: string = 'agree';
    scripts;

    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId,
        @Inject(DOCUMENT) private document: Document,
        private windowRef: WindowRef,
        private caninicalService: CanonicalService
    ) {
        this.caninicalService.createCanonicalURL();
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            this.width = this.windowRef.nativeWindow.innerWidth;

            if (this.windowRef.nativeWindow.innerWidth <= 1024) {
                localStorage.setItem('elementOffset', '111')
            } else {
                localStorage.setItem('elementOffset', '0')
            }

            this.addAnchorListener();

            const agreed = localStorage.getItem('cookies-accepted');

            if (!agreed || agreed == null || agreed == '') {
                this.cookieAgree = 'not-agree';
            }
        }
    }

    ngOnInit() {
        const elements: Element[] = Array.from(document.getElementsByTagName("script"));
        elements.forEach((el: Element, index) => {
            if (el.id === "") {
                const hash: String = this.generateRandonString(5);
                el.setAttribute("id", `${hash}_${index.toString()}`);
            }
        })
    }

    ngAfterViewInit() {
        this.initiated = true;
        if (this.isBrowser) {
            this.footer = this.document.querySelector('footer');
            this.inactivateServiceWorksers();
        }
    }

    private generateRandonString(length) {
        var randonString = '';
        var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i < length; i++) {
            randonString += char.charAt(Math.floor(Math.random() * char.length));
        }
        return randonString;
    }

    addAnchorListener() {
        this.router.events.pipe(filter((e: Event): e is Scroll => e instanceof Scroll)).subscribe(async () => {
            const fragment = this.activatedRoute.snapshot.fragment;
            const offset = parseInt(localStorage.getItem('elementOffset'))
            this.caninicalService.createCanonicalURL();
            if (fragment) {
                this.cdRef.detectChanges();
                this.windowRef.nativeWindow.scroll(0, 0)
                setTimeout(() => {
                    const element = this.document.getElementById(fragment);
                    if (element) {
                        const top = ((element.getBoundingClientRect().top + this.windowRef.nativeWindow.pageYOffset) - offset);
                        this.windowRef.nativeWindow.scrollTo({
                            left: 0,
                            top: top,
                            behavior: "smooth"
                        })
                    }
                }, 500)
            }
        });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.scrollTop = event.currentTarget.pageYOffset;
        if (this.scrollTop > this.windowRef.nativeWindow.innerHeight) {
            this.showBtnToTop = true;
        } else {
            this.showBtnToTop = false;
        }

        if (this.footer && this.footer != null) {
            const footerTop = this.footer.getBoundingClientRect().top + window.pageYOffset;
            const footerBottom = this.footer.getBoundingClientRect().bottom + window.pageYOffset;
            const bottomTop = (this.windowRef.nativeWindow.innerHeight + this.scrollTop)
            if (bottomTop > footerTop && bottomTop < footerBottom) {
                this.invertColors = true;
            } else {
                this.invertColors = false;
            }
        }
    }

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;

            if (this.width < 1024) {
                localStorage.setItem('elementOffset', '111');

            } else {
                localStorage.setItem('elementOffset', '0');
            }

        }
    }

    ///////////////////////////////////////////////////////
    // Adiciona classe que remove outline quando o mouse está em movimento.
    ///////////////////////////////////////////////////////
    @HostListener('document:mousedown') onMousedown() {
        if (this.isBrowser) {
            this.document.body.classList.add('using-mouse');
        }
    }

    ///////////////////////////////////////////////////////
    // Adiciona classe que remove outline quando o mouse está em movimento.
    ///////////////////////////////////////////////////////
    @HostListener('document:keydown', ['$event']) onKeydown(event) {
        if (this.isBrowser) {
            if (event.keyCode === 9) {
                this.document.body.classList.remove('using-mouse');
            }
        }
    }

    goToTop() {
        this.windowRef.nativeWindow.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

    agreeCookieComponent() {
        this.cookieAgree = 'agree';
        localStorage.setItem('cookies-accepted', 'true');
    }

    ///////////////////////////////////////////////////////
    // Tratativa para remover cache antigo do site, e fazer com que as LPS sejam sempre acessíveis.
    ///////////////////////////////////////////////////////
    private inactivateServiceWorksers() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister()
                }
            });
        }
    }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, HostListener, AfterViewInit } from '@angular/core';
import { RouteModel } from 'src/app/models';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router, Event, ActivatedRoute, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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
    cookieAgree: string = 'not-agree';

    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId,
        @Inject(DOCUMENT) private document: Document,
        private windowRef: WindowRef,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private caninicalService: CanonicalService
    ) {
        this.caninicalService.createCanonicalURL();
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
            this.width = this.windowRef.nativeWindow.innerWidth;

            if (this.windowRef.nativeWindow.innerWidth <= 1024) {
                localStorage.setItem('elementOffset', '72')
            } else {
                localStorage.setItem('elementOffset', '0')
            }

            this.addAnchorListener();

            const agreed = localStorage.getItem('cookies-accepted');

            if (agreed == 'true') {
                this.cookieAgree = 'agree';
            }

        }

        iconRegistry.addSvgIconLiteral(
            'datepickerCustom', sanitizer.bypassSecurityTrustHtml(`<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 2H17V0H15V2H5V0H3V2H2C0.9 2 0 2.90002 0 4V20C0 21.1 0.9 22 2 22H18C19.1 22 20 21.1 20 20V4C20 2.90002 19.1 2 18 2ZM18 20H2V9H18V20ZM2 7H18V4H2V7Z" fill="#808080"/>
            </svg>
            `));
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.initiated = true;
        if (this.isBrowser) {
            this.footer = this.document.querySelector('footer');
        }
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
            const bottomTop = (this.windowRef.nativeWindow.innerHeight + this.scrollTop)
            if (bottomTop > footerTop) {
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
}

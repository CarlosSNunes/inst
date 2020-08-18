import { Component, OnInit, Input, HostListener, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ElementModel } from 'src/app/models';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() elements: ElementModel[] = [];
    @Input() offset: number = 153;

    items: Array<any> = [];
    prefix: string = 'anchor-';
    isBrowser: boolean = false;
    elementOffset: number = 0;

    constructor(
        private elementRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            if (this.windowRef.nativeWindow.innerWidth <= 1400) {
                this.elementOffset = 72
            } else {
                this.elementOffset = 0
            }
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.mountSideBarAnchor();
            this.mountAnchor({ target: this.windowRef.nativeWindow });
        }
    }

    goToLink(id) {
        const elem = this.document.getElementById(id);
        this.elementOffset = parseInt(localStorage.getItem('elementOffset'));

        if (elem) {
            this.windowRef.nativeWindow.scroll({
                left: 0,
                top: ((elem.offsetTop - this.elementOffset) - 15),
                behavior: "smooth"
            })
        } else {
            console.error(`No element found with id ${id}`)
        }
    }

    @HostListener('window: scroll', ['$event']) onScroll(event) {
        if (this.isBrowser) {
            this.mountAnchor(event)
        }
    }

    mountAnchor(event) {

        let top = (this.windowRef.nativeWindow.pageYOffset || event.target.scrollTop) || 0;

        if (top != undefined && this.elements.length > 0) {
            top = top + this.offset

            ///////////////////////////////////////////////////////
            // For que ajusta os elementos
            ///////////////////////////////////////////////////////
            for (const item of this.items) {
                const ulLink = this.elementRef.nativeElement.querySelector(`.${this.prefix}${item.id}`)
                if (ulLink) {
                    if (top >= item.offsetTop && top <= (item.offsetTop + item.clientHeight)) {
                        if (!ulLink.classList.contains('active')) {
                            ulLink.classList.add('active')
                        }
                    } else {
                        if (ulLink.classList.contains('active')) {
                            ulLink.classList.remove('active')
                        }
                    }
                }
            }
        }
    }

    mountSideBarAnchor() {
        ///////////////////////////////////////////////////////
        // Links do menu
        ///////////////////////////////////////////////////////

        this.items = this.elements.map(elem => {
            return document.getElementById(elem.id)
        }).filter(item => item != null)

    }
}

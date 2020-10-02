import { Component, OnInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CardModel } from 'src/app/models';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() card?: any = new CardModel({
        type: 'default'
    });
    collapsed: boolean = true;
    @ViewChild('p', { static: false }) p: ElementRef<HTMLElement>;
    @ViewChild('link', { static: false }) link: ElementRef<HTMLElement>;
    heights = {
        p: 0,
        link: 0
    }
    isBrowser: boolean = false;
    width: number;

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    ngOnInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        this.width = event.target.innerWidth;

        if (this.width > 1023 && this.card.hasCollapse) {
            if (this.p && this.p.nativeElement.style.height == '0px') {
                this.p.nativeElement.style.height = `auto`;
            }
            if (this.link && this.link.nativeElement.style.height == '0px') {
                this.link.nativeElement.style.height = `auto`;
            }
        } else if (this.width <= 1023 && this.card.hasCollapse) {
            if (this.p && this.p.nativeElement.style.height != '0px') {
                this.p.nativeElement.style.height = '0px';
            }
            if (this.link && this.link.nativeElement.style.height != '0px') {
                this.link.nativeElement.style.height = '0px';
            }
        }
    }

    ngAfterViewInit() {
        if (this.isBrowser && this.card.hasCollapse) {
            this.initCollapse();
        }
    }

    initCollapse() {

        if (this.p) {
            this.heights.p = this.p.nativeElement.clientHeight;
            if (this.width < 1024) {
                this.p.nativeElement.style.height = '0px';
            }
        }

        if (this.link) {
            this.heights.link = this.link.nativeElement.clientHeight;
            if (this.width < 1024) {
                this.link.nativeElement.style.height = '0px';
            }
        }
        this.collapsed = false;

    }

    collapse() {
        if (this.width < 1024 && this.card.hasCollapse) {
            this.collapsed = !this.collapsed;

            if (this.collapsed) {
                if (this.link) {
                    this.link.nativeElement.style.height = `${this.heights.link}px`;
                }
                if (this.p) {
                    this.p.nativeElement.style.height = `${this.heights.p}px`;
                }
            } else {
                if (this.link) {
                    this.link.nativeElement.style.height = '0px';
                }
                if (this.p) {
                    this.p.nativeElement.style.height = '0px';
                }
            }
        }
    }
}

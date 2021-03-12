import { Component, OnInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { InfoSectionModel, ContentModalModel } from 'src/app/models';
import { ModalService } from 'src/app/services';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import SimpleParallax from 'simple-parallax-js';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-info-section',
    templateUrl: './info-section.component.html',
    styleUrls: ['./info-section.component.scss'],
})
export class InfoSectionComponent implements OnInit {
    @Input() sectionInfo: InfoSectionModel = new InfoSectionModel({})
    @Input() backgroundColorClass: string = 'white-background-color';
    @ViewChild('sectionInfoElement', { static: false }) sectionInfoElement: ElementRef<HTMLElement>;
    isBrowser: boolean = false;
    changeToBackground: boolean = false;
    constructor(
        private modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            if (this.sectionInfo.parallax && this.windowRef.nativeWindow.innerWidth > 1023) {
                this.activateParallax();
            }

            const ua = this.windowRef.nativeWindow.navigator.userAgent;
            const msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
            {
                this.changeToBackground = true;
            }
        }
    }

    activateParallax() {
        const nodeElements: any = this.elementRef.nativeElement.querySelectorAll('.col-image img');
        new SimpleParallax(nodeElements, {
            orientation: 'down'
        });
    }

    get offsetTop(): number {
        return this.sectionInfoElement.nativeElement.offsetTop;
    }

    openModal() {
        if (this.sectionInfo.hasModal) {
            this.modalService.openModal(this.sectionInfo.modalContent)
        }
    }
}

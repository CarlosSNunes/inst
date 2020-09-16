import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { congeladosDaSoniaCard, promolightCard, personalCookCard, personalChefsCard, fourAnyOneCard } from './data/promo-cards';

@Component({
    selector: 'app-cards-section',
    templateUrl: './cards-section.component.html',
    styleUrls: ['./cards-section.component.scss']
})
export class CardsSectionComponent implements OnInit {
    width: number = 1440;
    isBrowser: boolean = false;
    congeladosDaSoniaCard = congeladosDaSoniaCard;
    promolightCard = promolightCard;
    personalCookCard = personalCookCard;
    personalChefsCard = personalChefsCard;
    fourAnyOneCard = fourAnyOneCard;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
        }
    }
}

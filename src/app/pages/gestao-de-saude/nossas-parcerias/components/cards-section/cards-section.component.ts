import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import { congeladosDaSoniaCard, promolightCard, emporioDaPapinhaCard, personalCookCard, personalChefsCard, fourAnyOneCard, antiloperacingteamCard } from './data/promo-cards';

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
    emporioDaPapinhaCard = emporioDaPapinhaCard;
    personalCookCard = personalCookCard;
    personalChefsCard = personalChefsCard;
    fourAnyOneCard = fourAnyOneCard;
    antiloperacingteamCard = antiloperacingteamCard;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform,
        private windowRef: WindowRef,
        // private elementRef: ElementRef<HTMLElement>
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
        if (this.isBrowser) {
            this.width = this.windowRef.nativeWindow.innerWidth;
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getHigherCardHeight()
    }

    @HostListener('window: resize', ['$event']) onResize(event) {
        if (this.isBrowser) {
            this.width = event.target.innerWidth;
        }
    }

    getHigherCardHeight() {
        // if (this.isBrowser) {
        //     const elements: any = this.elementRef.nativeElement.querySelectorAll('.internal-content');

        //     let higherHeight = 0
        //     elements.forEach(element => {
        //         if (element.clientHeight > higherHeight) {
        //             higherHeight = element.clientHeight
        //         }
        //     })


        //     elements.forEach((element: HTMLElement) => {
        //         element.style.height = `${higherHeight}px`;
        //     })
        // }
    }
}

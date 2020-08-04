import { Component, OnInit, ViewChild, ElementRef, Input, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'src/utils/window-ref';
import Cards from './data/cards';
import { CardModel } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @ViewChild('activeLine', { static: false }) activeLine: ElementRef<HTMLElement>;
    @ViewChild('firstTab', { static: false }) firstTab: ElementRef<HTMLElement>;
    selectedTab: number = 1;
    tabs = [
        {
            name: 'Todos',
            segment: ''
        },
        {
            name: 'Beneficiário',
            segment: 'beneficiario'
        },
        {
            name: 'Gestor de rh',
            segment: 'rh'
        },
        {
            name: 'Corretor',
            segment: 'corretor'
        },
        {
            name: 'Credenciado',
            segment: 'credenciado'
        },
    ];
    isBrowser: boolean = false;
    cards: CardModel[] = Cards;
    filteredCards: CardModel[] = this.cards;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Platform,
        private elementRef: ElementRef<HTMLElement>,
        private windowRef: WindowRef,
        private router: Router
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
    }

    @HostListener('window:resize') onResize() {
        if (this.isBrowser && this.windowRef.nativeWindow.innerWidth > 1023) {
            const elements = this.elementRef.nativeElement.querySelectorAll('.tabs .tab-title');
            this.activeTab(this.selectedTab, elements[this.selectedTab - 1] as HTMLElement);
        }
    }

    ngAfterViewInit() {
        if (this.isBrowser && this.windowRef.nativeWindow.innerWidth > 1023) {
            const left = this.firstTab.nativeElement.getBoundingClientRect().left - this.firstTab.nativeElement.parentElement.getBoundingClientRect().left;
            this.activeLine.nativeElement.style.left = `${left - (this.firstTab.nativeElement.clientWidth / 10)}px`;
            this.activeLine.nativeElement.style.width = `${this.firstTab.nativeElement.clientWidth * 1.2}px`;
        }
    }

    activeTab(tab: number, element: HTMLElement) {
        if (this.isBrowser && this.windowRef.nativeWindow.innerWidth > 1023) {
            const left = element.getBoundingClientRect().left - element.parentElement.getBoundingClientRect().left;
            this.activeLine.nativeElement.style.left = `${left - (element.clientWidth / 10)}px`;
            this.activeLine.nativeElement.style.width = `${element.clientWidth * 1.2}px`;
        }
        this.selectedTab = tab;
        this.tabs[tab - 1].segment;
        this.filterCards(this.tabs[tab - 1].segment);
    }

    filterCards(segment) {
        this.filteredCards = this.cards;
        if (segment) {
            this.filteredCards = this.filteredCards.filter(card => card.category === segment);
        }
    }

    goTo(id) {
        this.router.navigate(['/carreiras-careplus', id]);
    }

}

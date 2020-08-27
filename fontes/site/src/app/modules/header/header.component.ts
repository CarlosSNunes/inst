import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { MatSliderChange } from '@angular/material';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SimuladoresService } from 'src/app/services';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    fontInitialValue: number = 16;
    minValue: number = 16;
    maxValue: number = 18;
    step: number = 1;
    isBrowser: boolean = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private simuladoresService: SimuladoresService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            const fontSize = localStorage.getItem('defaultfontsize');
            if (fontSize) {
                this.setFontSize(parseInt(fontSize));
            } else {
                localStorage.setItem('defaultfontsize', `${this.fontInitialValue}`);
            }
        }
    }

    changeFontSize(event: MatSliderChange) {
        this.setFontSize(event.value)
    }

    setFontSize(value: number) {
        this.fontInitialValue = value;
        this.document.documentElement.style.fontSize = `${value}px`;
        this.document.body.style.fontSize = `${value}px`;
        localStorage.setItem('defaultfontsize', `${value}`);
    }

    changeStep(subtract: boolean) {
        if (subtract && this.fontInitialValue > this.minValue) {
            this.fontInitialValue -= this.step;
            this.setFontSize(this.fontInitialValue)
        } else if (this.fontInitialValue < this.maxValue && subtract == false) {
            this.fontInitialValue += this.step;
            this.setFontSize(this.fontInitialValue)
        }
    }

    openSimulator() {
        this.simuladoresService.open();
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { MatSliderChange } from '@angular/material';
import { DOCUMENT } from '@angular/common';
import { SimuladoresService } from 'src/app/services';

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
    bightnessMode: string = 'default';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private simuladoresService: SimuladoresService
    ) { }

    ngOnInit() {
    }

    changeFontSize(event: MatSliderChange) {
        this.setFontSize(event.value)
    }

    setFontSize(value: number) {
        this.fontInitialValue = value;
        this.document.documentElement.style.fontSize = `${value}px`;
        this.document.body.style.fontSize = `${value}px`;
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

    setBrightness(mode: string) {
        this.bightnessMode = mode;
    }

    openSimulator() {
        this.simuladoresService.open();
    }
}

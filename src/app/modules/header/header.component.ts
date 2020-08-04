import { Component, OnInit, Inject } from '@angular/core';
import { WindowRef } from 'src/utils/window-ref';
import { MatSliderChange } from '@angular/material';
import { DOCUMENT } from '@angular/common';

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
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
    }

    // openOuvidoria() {
    //     this.winRef.nativeWindow.open('https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx', '_blank');
    // }

    // openCanalDeDenuncia() {
    //     this.winRef.nativeWindow.open('https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx', '_blank');
    // }

    // openLinkedin() {
    //     this.winRef.nativeWindow.open('https://linkedin.com/company/care-plus', '_blank')
    // }

    // openInstagram() {
    //     this.winRef.nativeWindow.open('https://www.instagram.com/careplusoficial', '_blank')
    // }

    // openFacebook() {
    //     this.winRef.nativeWindow.open('https://www.facebook.com/careplusnarede/', '_blank')
    // }

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
}

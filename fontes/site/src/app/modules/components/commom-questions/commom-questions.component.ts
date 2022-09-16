import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-commom-questions',
    templateUrl: './commom-questions.component.html',
    styleUrls: ['./commom-questions.component.scss']
})
export class CommomQuestionsComponent implements OnInit {
    isBrowser: boolean = false;
    @Input() htag: string = 'h5';
    public mobileOrDesktop: any;
    constructor() { }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        if (window.innerWidth >= 1023) {
            this.mobileOrDesktop = 'btn btn-digital-cian secondary arrow-right medium is-hidden-touch'
        } else {
            this.mobileOrDesktop = 'btn btn-digital-cian tertiary arrow-right medium is-hidden-desktop'
        }
    }
}

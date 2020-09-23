import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
    selector: 'app-cookie-notice',
    templateUrl: './cookie-notice.component.html',
    styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {
    @Output() agree: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('cookieNotice', { static: false }) cookieNotice: ElementRef<HTMLElement>;
    language: string = 'pt';
    texts = [
        {
            language: 'pt',
            title: 'Utilização do cookies neste site',
            description: 'Cookies nos ajudam a dar-lhe a melhor experiência no nosso site e os utilizamos apenas para armazenar detalhes desta sessão. Você pode desligá-lo, se preferir. No entanto, ao continuar usando o site sem alterar as configurações, você concorda com o uso de cookies.',
            buttonText: 'Concordar'
        },
        {
            language: 'en',
            title: 'Use of cookies in this website',
            description: 'Cookies help us give you the best experience on our website and we use them only to store details of this session. You can switch off if you prefer. However, by continuing to use the site without changing settings, you are agreeing to our use of cookies.',
            buttonText: 'To agree'
        }
    ];
    selectedLanguageTexts = {
        language: 'pt',
        title: 'Utilização do cookies neste site',
        description: 'Cookies nos ajudam a dar-lhe a melhor experiência no nosso site e os utilizamos apenas para armazenar detalhes desta sessão. Você pode desligá-lo, se preferir. No entanto, ao continuar usando o site sem alterar as configurações, você concorda com o uso de cookies.',
        buttonText: 'Concordar'
    };
    isBrowser: boolean = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Platform,
        private cdr: ChangeDetectorRef
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId)
    }

    ngOnInit() {
    }

    changeLanguage(language: string) {
        this.selectedLanguageTexts = this.texts.find(t => t.language === language);
    }

}

import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, Input, HostListener } from '@angular/core';
import { ButtonModel, IconCardModel } from 'src/app/models';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() htag: string = 'h5';
    public getScreenWidth: any;
    button: ButtonModel = new ButtonModel({
        link: '/fale-conosco/solicite-uma-cotacao',
        text: 'Entre em contato'
    });
    @ViewChild('buttonElement', { static: false }) buttonElement: ElementRef<HTMLButtonElement>;
    isBrowser: boolean = false;
    contactCard: IconCardModel = new IconCardModel({
        title: 'E-mail',
        type: 'icon',
        button: new ButtonModel({
            text: 'gestaosaude@careplus.com.br',
            link: 'mailto: gestaosaude@careplus.com.br'
        }),
        imagePath: 'assets/svg/email.svg',
        backgroundColorClass: 'white-background-color'
    });
    phoneCard: IconCardModel = new IconCardModel({
        title: 'Telefone',
        type: 'icon',
        imagePath: 'assets/svg/phone.svg',
        backgroundColorClass: 'white-background-color'
    })
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private plataformId
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
        this.contactCard.backgroundColorClass = this.backgroundColorClass;
        this.phoneCard.backgroundColorClass = this.backgroundColorClass;
        if (this.isBrowser) {
            this.buttonListener()
        }
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    buttonListener() {
        if (this.buttonElement) {
            this.buttonElement.nativeElement.addEventListener('click', () => {
                if (this.button.link) {
                    this.router.navigate([this.button.link])
                }
                if (this.button.action) {
                    this.button.action()
                }
            })
        }
    }

    ngOnDestroy() {
        if (this.buttonElement) {
            this.buttonElement.nativeElement.removeEventListener('click', () => null)
        }
    }


}

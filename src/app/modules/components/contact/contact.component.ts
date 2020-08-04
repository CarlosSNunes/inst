import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonModel, IconCardModel } from 'src/app/models';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    button: ButtonModel = new ButtonModel({
        link: '',
        text: 'AGENDAR VISITA'
    });
    @ViewChild('buttonElement', { static: false }) buttonElement: ElementRef<HTMLButtonElement>;
    isBrowser: boolean = false;
    contactCard: IconCardModel = new IconCardModel({
        title: 'E-mail',
        type: 'icon',
        link: 'mailto: gestaodesaude@careplus.com.br',
        linkTitle: 'gestaodesaude@careplus.com.br',
        imagePath: 'assets/svg/email.svg',
        backgroundColorClass: 'blue-background-color'
    });
    phoneCard: IconCardModel = new IconCardModel({
        title: 'Telefone',
        type: 'icon',
        imagePath: 'assets/svg/phone.svg',
        backgroundColorClass: 'blue-background-color'
    })
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private plataformId
    ) {
        this.isBrowser = isPlatformBrowser(this.plataformId)
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.buttonListener()
        }
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

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconCardModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-contact-schedule-a-visit',
    templateUrl: './contact-schedule-a-visit.component.html',
    styleUrls: ['./contact-schedule-a-visit.component.scss']
})
export class ContactScheduleAVisitComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() bigTitle: string = 'Entre em contato ou agende uma visita';
    @Input() htag: string = 'h5';
    @Input() firstCard: IconCardModel = new IconCardModel({
        title: 'Proposta - Planos de Saúde',
        type: 'icon',
        button: new ButtonModel({
            link: 'tel:011 99967-5467',
            text: '(11) 99967-5467',
            target: '_self',
        }),
        imagePath: 'assets/svg/phone.svg',
        backgroundColorClass: this.backgroundColorClass
    }); 
    @Input() secondCard: IconCardModel = new IconCardModel({
        title: 'Solicite uma Proposta',
        type: 'icon',
        imagePath: 'assets/svg/calendar.svg',
        button: new ButtonModel({
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            text: 'Clique e solicite uma proposta',
            target: '_self',
        }),
        backgroundColorClass: this.backgroundColorClass
    });  
    constructor(
        private windowRef: WindowRef,
        private router: Router
    ) { }

    ngOnInit() {
        this.firstCard.backgroundColorClass = this.backgroundColorClass;   
        this.secondCard.backgroundColorClass = this.backgroundColorClass;    
    }

    open(card: IconCardModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {
            if (card.button.link) {
                this.windowRef.nativeWindow.open(card.button.link, card.button.target);
            } else if (card.button.routerLink) {
                this.router.navigate([card.button.routerLink], {
                    queryParams: card.button.queryParams
                });
            }
        }
    }

}

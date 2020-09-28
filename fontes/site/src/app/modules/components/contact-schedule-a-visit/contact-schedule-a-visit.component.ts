import { Component, OnInit, Input } from '@angular/core';
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
    @Input() firstCard: IconCardModel = new IconCardModel({
        title: 'Central de atendimento',
        type: 'icon',
        button: new ButtonModel({
            link: 'tel: 11 4197-9000',
            text: '(11) 4197-9000',
            target: '_self',
        }),
        imagePath: 'assets/svg/phone.svg',
        backgroundColorClass: this.backgroundColorClass
    });
    @Input() secondCard: IconCardModel = new IconCardModel({
        title: 'Solicite uma Cotação',
        type: 'icon',
        imagePath: 'assets/svg/calendar.svg',
        button: new ButtonModel({
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            text: 'Clique e solicite uma cotação',
            target: '_blank',
        }),
        backgroundColorClass: this.backgroundColorClass
    })
    constructor(
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
        this.firstCard.backgroundColorClass = this.backgroundColorClass;
        this.secondCard.backgroundColorClass = this.backgroundColorClass;
    }

    open(card: IconCardModel) {
        if (this.windowRef.nativeWindow.innerWidth < 1024) {
            this.windowRef.nativeWindow.open(card.button.link, '_blank');

        }
    }

}

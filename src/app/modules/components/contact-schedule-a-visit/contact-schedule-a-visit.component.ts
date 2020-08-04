import { Component, OnInit, Input } from '@angular/core';
import { IconCardModel } from 'src/app/models';
import { Icon } from '@fortawesome/fontawesome-svg-core';
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
        link: 'tel: 11 4197-9000',
        linkTitle: '(11) 4197-9000',
        imagePath: 'assets/svg/phone.svg',
        target: '_self',
        backgroundColorClass: this.backgroundColorClass
    });
    @Input() secondCard: IconCardModel = new IconCardModel({
        title: 'Agendar visita',
        type: 'icon',
        link: 'https://goo.gl/maps/gCYmP561AMkpWeBTA',
        linkTitle: 'Clique e agende uma visita',
        imagePath: 'assets/svg/calendar.svg',
        target: '_blank',
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
            this.windowRef.nativeWindow.open(card.link, '_blank');

        }
    }

}

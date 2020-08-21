import { Component, OnInit } from '@angular/core';
import { IconCardModel, ButtonModel } from 'src/app/models';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    today: number = Date.now();
    siteMapOpened = false;
    atendimentoPresencialCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Atendimento presencial',
            link: '#',
        }),
        imagePath: 'assets/svg/maps.svg',
        backgroundColorClass: 'white-background-color'
    });
    centralDeAtendimentoCard: IconCardModel = new IconCardModel({
        type: 'icon',
        button: new ButtonModel({
            text: 'Central de atendimento',
            link: 'tel:11 4197-9000'
        }),
        imagePath: 'assets/svg/phone.svg',
        backgroundColorClass: 'white-background-color'
    });

    constructor() { }

    ngOnInit() {
    }
}

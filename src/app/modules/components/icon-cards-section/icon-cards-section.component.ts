import { Component, OnInit, Input } from '@angular/core';
import { IconCardsSectionModel } from 'src/app/models';

@Component({
    selector: 'app-icon-cards-section',
    templateUrl: './icon-cards-section.component.html',
    styleUrls: ['./icon-cards-section.component.scss']
})
export class IconCardsSectionComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel();

    constructor() {
    }

    ngOnInit() {
        this.iconCardsSectionModel.cards = this.iconCardsSectionModel.cards.map(card => {
            card.backgroundColorClass = this.backgroundColorClass
            return card
        });
    }

}

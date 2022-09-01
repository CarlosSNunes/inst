import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { IconCardsSectionModel } from 'src/app/models';

@Component({
    selector: 'app-icon-cards-section',
    templateUrl: './icon-cards-section.component.html',
    styleUrls: ['./icon-cards-section.component.scss']
})
export class IconCardsSectionComponent implements OnInit, OnChanges {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel();
    public getScreenWidth: any;
    constructor() {
    }

    ngOnInit() {
        this.iconCardsSectionModel.cards.forEach(card => {
            card.backgroundColorClass = this.backgroundColorClass
        });
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.backgroundColorClass) {
            this.backgroundColorClass = changes.backgroundColorClass.currentValue;
        }

        if (changes.iconCardsSectionModel) {
            this.iconCardsSectionModel = changes.iconCardsSectionModel.currentValue;
        }

        this.iconCardsSectionModel.cards = this.iconCardsSectionModel.cards.map(card => {
            card.backgroundColorClass = this.backgroundColorClass
            return card
        });
    }

}

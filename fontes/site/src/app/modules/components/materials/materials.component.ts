import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardModel } from 'src/app/models';
import Cards from './data/cards';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    cards: Array<CardModel> = Cards;
    public getScreenWidth: any;
    constructor() { }

    ngOnInit() {
        this.cards = this.cards.map(card => {
            card.backgroundColorClass = this.backgroundColorClass;
            return card;
        });
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }
}

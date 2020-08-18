import { Component, OnInit, Input } from '@angular/core';
import Cards from './data/cards';

@Component({
    selector: 'app-our-differentials',
    templateUrl: './our-differentials.component.html',
    styleUrls: ['./our-differentials.component.scss']
})
export class OurDifferentialsComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    cards = Cards;
    constructor() { }

    ngOnInit() {
        
    }

}

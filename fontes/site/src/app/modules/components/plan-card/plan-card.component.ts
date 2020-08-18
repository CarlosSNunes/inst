import { Component, OnInit, Input } from '@angular/core';
import { PlanCardModel } from 'src/app/models';

@Component({
    selector: 'app-plan-card',
    templateUrl: './plan-card.component.html',
    styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
    @Input() planCardModel: PlanCardModel = new PlanCardModel();
    @Input() backgroundColorClass: string = 'white-background-color';
    constructor() { }

    ngOnInit() {
    }

}

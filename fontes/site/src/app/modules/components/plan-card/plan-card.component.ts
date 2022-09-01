import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PlanCardModel } from 'src/app/models';

@Component({
    selector: 'app-plan-card',
    templateUrl: './plan-card.component.html',
    styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
    @Input() planCardModel: PlanCardModel = new PlanCardModel();
    @Input() backgroundColorClass: string = 'white-background-color';
    public getScreenWidth: any;
    constructor() { }

    ngOnInit() {
        this.onWindowResize();
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.getScreenWidth = window.innerWidth;
    }
}

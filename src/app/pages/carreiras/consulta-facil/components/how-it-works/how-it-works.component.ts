import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-how-it-works',
    templateUrl: './how-it-works.component.html',
    styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';

    constructor() { }

    ngOnInit() {
    }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-home-step',
    templateUrl: './home-step.component.html',
    styleUrls: ['./home-step.component.scss']
})
export class HomeStepComponent implements OnInit {
    @Output() goToNextStep: EventEmitter<void> = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
    }

}

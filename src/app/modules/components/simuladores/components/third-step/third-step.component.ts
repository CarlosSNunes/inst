import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-third-step',
    templateUrl: './third-step.component.html',
    styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
    @Output() finish: EventEmitter<void> = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
    }

}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-first-step',
    templateUrl: './first-step.component.html',
    styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
    @Input() firstStepForm: FormGroup;

    constructor() {}

    ngOnInit() {

    }

    get form() {
        return this.firstStepForm.controls;
    }

}
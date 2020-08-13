import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
    @Input() secondStepForm: FormGroup;

    constructor() {}

    ngOnInit() {

    }

    get form() {
        return this.secondStepForm.controls;
    }

}

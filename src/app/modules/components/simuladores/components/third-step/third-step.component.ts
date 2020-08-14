import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from 'src/utils/window-ref';
import { PlanModel } from 'src/app/models';

@Component({
    selector: 'app-third-step',
    templateUrl: './third-step.component.html',
    styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit, OnChanges {
    @Output() finish: EventEmitter<void> = new EventEmitter<void>();
    @Input() selectedPlan: PlanModel = new PlanModel({});
    constructor(
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.selectedPlan = changes.selectedPlan.currentValue;
    }

    goToPlan() {
        this.windowRef.nativeWindow.open(`/produtos-e-planos-careplus/${this.selectedPlan.linkId}`, '_blank')
    }

}

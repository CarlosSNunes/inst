import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
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
    message: string = 'O nosso produto mais indicado para sua empresa é:';
    constructor(
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedPlan.currentValue && changes.selectedPlan.currentValue.id) {
            this.message = 'O nosso produto mais indicado para sua empresa é:'
            this.selectedPlan = changes.selectedPlan.currentValue;
        } else {
            this.message = 'Você escolheu o:'
            this.selectedPlan = new PlanModel({
                name: 'Medicina Ocupacional',
                id: 'medicina-ocupacional',
                subTitle: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável',
                linkId: 'medicina-ocupacional'
            });
        }
    }

    goToPlan() {
        this.windowRef.nativeWindow.open(`/planos-e-produtos/${this.selectedPlan.linkId}`, '_blank')
    }

}

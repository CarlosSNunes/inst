import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PlanCardModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-plans-infos',
    templateUrl: './plans-infos.component.html',
    styleUrls: ['./plans-infos.component.scss']
})
export class PlansInfosComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    @Input() selectedOptionId: number = 1;
    @Input() plan: any = {
        plansTypes: [
            [],
            []
        ]
    };
    @Input() cardPlan: PlanCardModel;
    @Output() setSelectedOptionId: EventEmitter<number> = new EventEmitter<number>();
    options = [
        {
            id: 1,
            name: 'Planos de Saúde',
            active: true
        },
        {
            id: 2,
            name: 'Plano Odontológico',
            active: false
        },
    ];
    cards = [];
    constructor(
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
        this.cards = this.plan.plansTypes[0].plans;
    }

    activeOption(optionId: number) {
        this.options = this.options.map((option) => {
            if (option.id === optionId) {
                option.active = true;
                this.changeCards(option);
                this.selectedOptionId = option.id;
                this.setSelectedOptionId.emit(option.id)
            } else {
                option.active = false;
            }
            return option;
        });
        if (this.windowRef.nativeWindow.innerWidth > 1023) {
            this.options.sort((a, b) => {
                if (a.active && !b.active) {
                    return -1
                } else {
                    return 1
                }
            });
        }
    }

    changeCards(option) {
        if (option.id === 1) {
            this.cards = this.plan.plansTypes[0].plans;
        } else {
            this.cards = this.plan.plansTypes[1].plans;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedOptionId) {
            this.activeOption(changes.selectedOptionId.currentValue)
        }
        if (changes.cardPlan) {
            this.cardPlan = changes.cardPlan.currentValue;
        }
        if (changes.plan) {
            this.plan = changes.plan.currentValue;
            this.cards = this.plan.plansTypes[0].plans;
        }
    }

}

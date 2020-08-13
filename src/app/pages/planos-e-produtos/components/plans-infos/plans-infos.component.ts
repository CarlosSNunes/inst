import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { carePlusCards, carePlusCardsOdonto } from './data/cards';
import { PlanCardModel, ButtonModel } from 'src/app/models';
import { WindowRef } from 'src/utils/window-ref';

@Component({
    selector: 'app-plans-infos',
    templateUrl: './plans-infos.component.html',
    styleUrls: ['./plans-infos.component.scss']
})
export class PlansInfosComponent implements OnInit {
    @Input() backgroundColorClass: string = 'white-background-color';
    options = [
        {
            id: 1,
            name: 'Planos de Saúde',
            active: true
        },
        {
            id: 2,
            name: 'Planos Odontológicos',
            active: false
        },
    ];
    cards = carePlusCards;
    cardPlan: PlanCardModel = new PlanCardModel({
        title: 'Master International',
        subTitle: 'Plano internacional',
        description: 'O Master International é o plano de cobertura internacional exclusivo dos Produtos de Saúde. (presente em todos os produtos de saúde)',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            link: 'https://www8.careplus.com.br/masterinternational/'
        }),
        image: 'assets/svg/plans-international.svg'
    });
    @Input() selectedOptionId: number = 1;
    @Output() setSelectedOptionId: EventEmitter<number> = new EventEmitter<number>();
    constructor(
        private windowRef: WindowRef
    ) { }

    ngOnInit() {
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
            this.cards = carePlusCards;
        } else {
            this.cards = carePlusCardsOdonto;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.activeOption(changes.selectedOptionId.currentValue)
    }

}
